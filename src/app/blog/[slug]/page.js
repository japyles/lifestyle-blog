import Image from 'next/image'
import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'
import { Header } from '@/components/header'
import { ObjectId } from 'mongodb'
import { serializeDocument } from '@/lib/serialize'
import { parseMarkdown } from '@/lib/parseMarkdown'
import CommentSection from '@/components/CommentSection'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function BlogPost({ params }) {
  const { db } = await connectToDatabase()
  const session = await getServerSession(authOptions)

  const slug = params.slug

  let query;
  if (ObjectId.isValid(slug)) {
    query = { _id: new ObjectId(slug) };
  } else {
    query = { slug: slug };
  }

  const post = serializeDocument(await db.collection('blogPosts').findOne(query))

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="max-w-3xl mx-auto">
          {post.imageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl.startsWith('http') 
                  ? post.imageUrl 
                  : `${process.env.NEXT_PUBLIC_BASE_URL}${post.imageUrl}`}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <h1 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl text-center leading-tight mb-4">
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
          <div 
            className="prose prose-lg mx-auto px-4 sm:px-0 space-y-6"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
          />
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <Link 
                  key={tag}
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </article>

        <CommentSection postId={post._id} initialComments={post.comments} session={session} />
      </main>
    </div>
  )
}




// import Image from 'next/image'
// import Link from 'next/link'
// import { connectToDatabase } from '@/lib/mongodb'
// import { Header } from '@/components/header'
// import { ObjectId } from 'mongodb'
// import { serializeDocument } from '@/lib/serialize'
// import { parseMarkdown } from '@/lib/parseMarkdown'
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/pages/api/auth/[...nextauth]"
// import CommentSection from '@/components/CommentSection'

// async function getPostData(slug) {
//   const { db } = await connectToDatabase()
//   const query = ObjectId.isValid(slug)
//     ? { _id: new ObjectId(slug) }
//     : { slug: slug };

//   return serializeDocument(await db.collection('blogPosts').findOne(query))
// }

// export default async function BlogPost({ params }) {
//   const session = await getServerSession(authOptions)
//   const slug = params.slug
//   const post = await getPostData(slug)

//   if (!post) {
//     return <div>Post not found</div>
//   }

//   const parsedContent = parseMarkdown(post.content)

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />
//       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <article className="max-w-3xl mx-auto">
//           {session && session.user.role === 'admin' && (
//             <Link href={`/blog/edit/${post._id}`} className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
//               Edit Post
//             </Link>
//           )}
//           {post.imageUrl && (
//             <div className="mb-8 rounded-lg overflow-hidden">
//               <Image
//                 src={post.imageUrl}
//                 alt={post.title}
//                 width={800}
//                 height={400}
//                 className="w-full h-auto object-cover"
//               />
//             </div>
//           )}
//           <h1 className="font-dm-serif text-3xl sm:text-4xl md:text-5xl text-center leading-tight mb-4">
//             {post.title}
//           </h1>
//           <div className="flex justify-center items-center space-x-4 mb-8 text-gray-600 text-sm">
//             <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//             {post.category && (
//               <>
//                 <span>•</span>
//                 <span>{post.category}</span>
//               </>
//             )}
//           </div>
//           <div 
//             className="prose prose-lg mx-auto px-4 sm:px-0 space-y-6"
//             dangerouslySetInnerHTML={{ __html: parsedContent }}
//           />
//           {post.tags && post.tags.length > 0 && (
//             <div className="mt-12 flex flex-wrap justify-center gap-2">
//               {post.tags.map((tag) => (
//                 <Link 
//                   key={tag}
//                   href={`/tag/${encodeURIComponent(tag)}`}
//                   className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
//                 >
//                   #{tag}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </article>

//         <CommentSection postId={post._id} initialComments={post.comments} session={session} />
//       </main>
//     </div>
//   )
// }








