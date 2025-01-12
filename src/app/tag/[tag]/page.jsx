import { Suspense } from 'react';
import { connectToDatabase } from '@/lib/mongodb';
import { Header } from '@/components/header';
import { BlogListClient } from '@/components/BlogListClient';
import { serializeDocument } from '@/lib/serialize';

export default async function TagPage({ params }) {
  const { db } = await connectToDatabase();
  const tag = decodeURIComponent(params.tag);

  const posts = serializeDocument(
    await db
      .collection('blogPosts')
      .find({ tags: tag })
      .sort({ createdAt: -1 })
      .toArray()
  );

  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl font-bold mb-8 text-center'>
          Posts tagged with "{tag}"
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogListClient
            initialPosts={posts}
            tag={tag}
          />
        </Suspense>
      </main>
    </div>
  );
}
