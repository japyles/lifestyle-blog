import { Header } from '@/components/header';
import { BlogListClient } from '@/components/BlogListClient';
import { connectToDatabase } from '@/lib/mongodb';
import { serializeDocument } from '@/lib/serialize';

export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }) {
  const { db } = await connectToDatabase();

  // Safely access searchParams
  const search = String(searchParams?.search || '');
  const tag = String(searchParams?.tag || '');
  const currentPage = Number(searchParams?.page || 1);
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

  const [posts, total] = await Promise.all([
    db
      .collection('blogPosts')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * limit)
      .limit(limit)
      .toArray(),
    db.collection('blogPosts').countDocuments(query),
  ]);

  const serializedPosts = serializeDocument(posts);
  const totalPages = Math.ceil(total / limit);

  // Process image URLs
  const processedPosts = serializedPosts.map((post) => ({
    ...post,
    imageUrl:
      post.imageUrl && !post.imageUrl.startsWith('http')
        ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.imageUrl}`
        : post.imageUrl || '/placeholder.svg',
  }));

  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl font-bold mb-8 text-center'>Blog Posts</h1>
        <BlogListClient
          initialPosts={processedPosts}
          initialTotalPages={totalPages}
          currentPage={currentPage}
          searchQuery={search}
          tagFilter={tag}
        />
      </main>
    </div>
  );
}

// import { Header } from '@/components/header';
// import { BlogListClient } from '@/components/BlogListClient';
// import { connectToDatabase } from '@/lib/mongodb';
// import { serializeDocument } from '@/lib/serialize';

// export default async function BlogPage({ searchParams }) {
//   const { db } = await connectToDatabase();
//   const search = searchParams.search || '';
//   const tag = searchParams.tag || '';
//   const page = parseInt(searchParams.page || '1');
//   const limit = 10;

//   let query = {};
//   if (search) {
//     query.$or = [
//       { title: { $regex: search, $options: 'i' } },
//       { content: { $regex: search, $options: 'i' } },
//       { category: { $regex: search, $options: 'i' } },
//       { tags: { $in: [new RegExp(search, 'i')] } },
//     ];
//   }
//   if (tag) {
//     query.tags = { $in: [new RegExp(tag, 'i')] };
//   }

//   const initialPosts = serializeDocument(
//     await db
//       .collection('blogPosts')
//       .find(query)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .toArray()
//   );

//   const total = await db.collection('blogPosts').countDocuments(query);
//   const initialTotalPages = Math.ceil(total / limit);

//   return (
//     <div className='min-h-screen bg-white'>
//       <Header />
//       <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
//         <h1 className='text-4xl font-bold mb-8 text-center'>Blog Posts</h1>
//         <BlogListClient
//           initialPosts={initialPosts}
//           initialTotalPages={initialTotalPages}
//         />
//       </main>
//     </div>
//   );
// }
