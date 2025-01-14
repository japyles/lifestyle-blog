import { Header } from '@/components/header';
import { BlogListClient } from '@/components/BlogListClient';
import { connectToDatabase } from '@/lib/mongodb';
import { serializeDocument } from '@/lib/serialize';

export default async function BlogPage({ searchParams }) {
  const { db } = await connectToDatabase();
  const search = searchParams.search || '';
  const tag = searchParams.tag || '';
  const page = parseInt(searchParams.page || '1');
  const limit = 10;

  let query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }
  if (tag) {
    query.tags = { $in: [new RegExp(tag, 'i')] };
  }

  const initialPosts = serializeDocument(
    await db
      .collection('blogPosts')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
  );

  const total = await db.collection('blogPosts').countDocuments(query);
  const initialTotalPages = Math.ceil(total / limit);

  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl font-bold mb-8 text-center'>Blog Posts</h1>
        <BlogListClient
          initialPosts={initialPosts}
          initialTotalPages={initialTotalPages}
        />
      </main>
    </div>
  );
}

// import { Suspense } from 'react';
// import { Header } from '@/components/header';
// import { BlogListClient } from '@/components/BlogListClient';
// import { connectToDatabase } from '@/lib/mongodb';
// import { serializeDocument } from '@/lib/serialize';

// export default async function BlogPage({ searchParams }) {
//   const { db } = await connectToDatabase();
//   const search = searchParams.search || '';

//   let query = {};
//   if (search) {
//     query = { $text: { $search: search } };
//   }

//   const initialPosts = serializeDocument(
//     await db
//       .collection('blogPosts')
//       .find(query)
//       .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
//       .limit(10)
//       .toArray()
//   );

//   return (
//     <div className='min-h-screen bg-white'>
//       <Header />
//       <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
//         <h1 className='text-4xl font-bold mb-8 text-center'>Blog Posts</h1>
//         <Suspense fallback={<div>Loading...</div>}>
//           <BlogListClient initialPosts={initialPosts} />
//         </Suspense>
//       </main>
//     </div>
//   );
// }

// import { Suspense } from 'react';
// import { Header } from '@/components/header';
// import { BlogListClient } from '@/components/BlogListClient';

// export default function BlogPage() {
//   return (
//     <div className='min-h-screen bg-white'>
//       <Header />
//       <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
//         <h1 className='text-4xl font-bold mb-8 text-center'>Blog Posts</h1>
//         <Suspense fallback={<div>Loading...</div>}>
//           <BlogListClient />
//         </Suspense>
//       </main>
//     </div>
//   );
// }

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
