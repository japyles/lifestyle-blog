import Image from 'next/image'
import { connectToDatabase } from '@/lib/mongodb'
import { Header } from '@/components/header'
import { ObjectId } from 'mongodb'
import { serializeDocument } from '@/lib/serialize'

export default async function BlogPost({ params }) {
  const { db } = await connectToDatabase()
  const post = serializeDocument(await db.collection('blogPosts').findOne({ _id: new ObjectId(params.slug) }))

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          {post.imageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <h1 className="font-dm-serif text-4xl md:text-5xl text-center leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex justify-center items-center space-x-4 mb-8 text-gray-600 text-sm">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            {post.category && (
              <>
                <span>•</span>
                <span>{post.category}</span>
              </>
            )}
          </div>
          <div className="prose prose-lg mx-auto">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="space-y-6 text-gray-700 leading-relaxed"
            />
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </main>
    </div>
  )
}

