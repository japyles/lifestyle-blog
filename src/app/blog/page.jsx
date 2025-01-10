import { Header } from '@/components/header';
import { BlogList } from '@/components/blog-list';

export default function BlogPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl font-bold mb-8 text-center'>Blog Posts</h1>
        <BlogList />
      </main>
    </div>
  );
}

// import { Header } from '@/components/header'
// import { BlogList } from '@/components/blog-list'

// export default function BlogPage() {
//   return (
//     <div className="min-h-screen bg-white">
//       <Header />
//       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
//         <BlogList />
//       </main>
//     </div>
//   )
// }

// import { Header } from '@/components/header';
// import { BlogList } from '@/components/blog-list';
// import { connectToDatabase } from '@/lib/mongodb';
// import { serializeDocument } from '@/lib/serialize';
// import { parseMarkdown } from '@/lib/parseMarkdown';

// export default async function BlogPage() {
//   const { db } = await connectToDatabase();
//   const blogPosts = serializeDocument(
//     await db.collection('blogPosts').find({}).sort({ createdAt: -1 }).toArray()
//   );

//   // Parse the markdown for each blog post
//   const parsedBlogPosts = blogPosts.map((post) => ({
//     ...post,
//     title: parseMarkdown(post.title),
//     content: parseMarkdown(post.content),
//   }));

//   return (
//     <div className='min-h-screen bg-white'>
//       <Header />
//       <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
//         <BlogList posts={parsedBlogPosts} />
//       </main>
//     </div>
//   );
// }

// import { Header } from '@/components/header';
// import { BlogList } from '@/components/blog-list';
// import { connectToDatabase } from '@/lib/mongodb';
// import { serializeDocument } from '@/lib/serialize';

// export default async function BlogPage() {
//   const { db } = await connectToDatabase();
//   const blogPosts = serializeDocument(
//     await db.collection('blogPosts').find({}).sort({ createdAt: -1 }).toArray()
//   );

//   return (
//     <div className='min-h-screen bg-white'>
//       <Header />
//       <main className='container mx-auto px-4 py-12'>
//         <BlogList posts={blogPosts} />
//       </main>
//     </div>
//   );
// }
