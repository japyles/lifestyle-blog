import { Header } from '@/components/header'
import { FeaturedPost } from '@/components/featured-post'
import { PopularPosts } from '@/components/popular-posts'
import { BlogPosts } from '@/components/blog-posts'
import { connectToDatabase } from '@/lib/mongodb'
import { serializeDocument } from '@/lib/serialize'
import Image from 'next/image'

export default async function Home() {
  const { db } = await connectToDatabase()
  
  const featuredPost = serializeDocument(await db.collection('blogPosts').findOne({}, { sort: { createdAt: -1 } }))
  
  const popularPosts = serializeDocument(await db.collection('blogPosts')
    .find({})
    .sort({ views: -1 })
    .limit(3)
    .toArray())
  
  const recentPosts = serializeDocument(await db.collection('blogPosts')
    .find({})
    .sort({ createdAt: -1 })
    .limit(2)
    .toArray())

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className='relative aspect-[16/9] md:aspect-[21/9] overflow-hidden'>
          <Image
            src='/hero.jpg'
            alt='hero image of pretty girl with freckles'
            fill
            className='object-cover'
          />
          <div className='absolute inset-0 bg-black/20' />
          <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4'>
            <h1 className='font-anton text-[17px] border p-2 md:text-6xl max-w-3xl mb-4 text-[seashell] uppercase tracking-widest'>
              Leilani&#39;s Lifestyle Blog
            </h1>
          </div>
        </div>
        {/* <FeaturedPost
            title="Leilani's Lifestyle Blog"
            date="JANUARY 7, 2025"
            author="SUSAN THOMPSON"
            category="YAŞAM TARZI"
            image="/hero.jpg"
            slug="A Perfect Day in La Jolla, CA: Sun, Sand, and Style"
        /> */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <BlogPosts posts={recentPosts} />
            </div>
            <aside>
              <PopularPosts posts={popularPosts} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}






// import { Header } from '@/components/header'
// import { FeaturedPost } from '@/components/featured-post'
// import { PopularPosts } from '@/components/popular-posts'
// import { BlogPosts } from '@/components/blog-posts'
// import { connectToDatabase } from '@/lib/mongodb'
// import { serializeDocument } from '@/lib/serialize'

// export default async function Home() {
//   const { db } = await connectToDatabase()
  
//   const featuredPost = serializeDocument(await db.collection('blogPosts').findOne({}, { sort: { createdAt: -1 } }))
  
//   const popularPosts = serializeDocument(await db.collection('blogPosts')
//     .find({})
//     .sort({ views: -1 })
//     .limit(3)
//     .toArray())
  
//   const recentPosts = serializeDocument(await db.collection('blogPosts')
//     .find({})
//     .sort({ createdAt: -1 })
//     .limit(2)
//     .toArray())

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <main>
//         <FeaturedPost
//             title="A Perfect Day in La Jolla, CA: Sun, Sand, and Style"
//             date="JANUARY 7, 2025"
//             author="SUSAN THOMPSON"
//             category="YAŞAM TARZI"
//             image="/hero.jpg"
//             slug="natural-makeup-tips"
//           />
//         {/* {featuredPost && (
//           <FeaturedPost
//             title={featuredPost.title}
//             date={new Date(featuredPost.createdAt).toLocaleDateString()}
//             author={featuredPost.author}
//             category={featuredPost.category}
//             image={featuredPost.imageUrl || "/placeholder.svg?height=600&width=1200"}
//             slug={featuredPost._id}
//           />
//         )} */}
//         <div className="container mx-auto px-4 py-12">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="md:col-span-2">
//               <BlogPosts posts={recentPosts} />
//             </div>
//             <aside>
//               <PopularPosts posts={popularPosts} />
//             </aside>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

