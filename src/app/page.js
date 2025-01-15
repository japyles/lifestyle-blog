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
            priority
          />
          <div className='absolute inset-0 bg-black/20' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <h1 className='font-permanent-marker text-[seashell] uppercase tracking-widest whitespace-nowrap w-3/4 text-center overflow-hidden text-[4vw] md:text-[6vw] lg:text-[8vw]'>
              Leilani&#39;s Lifestyle Blog
            </h1>
          </div>
        </div>
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
// import Image from 'next/image'

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
//         <div className='relative aspect-[16/9] md:aspect-[21/9] overflow-hidden'>
//           <Image
//             src='/hero.jpg'
//             alt='hero image of pretty girl with freckles'
//             fill
//             className='object-cover'
//           />
//           <div className='absolute inset-0 bg-black/20' />
//           <div className='absolute inset-0 flex items-center justify-center'>
//             <h1 className='font-permanent-marker text-[seashell] uppercase tracking-widest whitespace-nowrap w-3/4 text-[4vw] text-center'>
//               Leilani&#39;s Lifestyle Blog
//             </h1>
//           </div>
//         </div>
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




