import { connectToDatabase } from '@/lib/mongodb'
import { Header } from '@/components/header'
import { ObjectId } from 'mongodb'

export default async function BlogPost({ params }) {
  const { db } = await connectToDatabase()
  const post = await db.collection('blogPosts').findOne({ _id: new ObjectId(params.slug) })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <article className="prose lg:prose-xl mx-auto">
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover mb-8" />
          )}
          <h1>{post.title}</h1>
          <p className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()} - {post.category}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="mt-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </main>
    </div>
  )
}

