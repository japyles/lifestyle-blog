import { Header } from '@/components/header'
import { FeaturedPost } from '@/components/featured-post'
import { PopularPosts } from '@/components/popular-posts'
import { BlogPosts } from '@/components/blog-posts'
import { connectToDatabase } from '@/lib/mongodb'
import { serializeDocument } from '@/lib/serialize'

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
        {featuredPost && (
          <FeaturedPost
            title={featuredPost.title}
            date={new Date(featuredPost.createdAt).toLocaleDateString()}
            author={featuredPost.author}
            category={featuredPost.category}
            image={featuredPost.imageUrl || "/placeholder.svg?height=600&width=1200"}
            slug={featuredPost._id}
          />
        )}
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

