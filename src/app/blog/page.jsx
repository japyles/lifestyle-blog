import { Header } from '@/components/header';
import { BlogList } from '@/components/blog-list';
import { connectToDatabase } from '@/lib/mongodb';
import { serializeDocument } from '@/lib/serialize';

export default async function BlogPage() {
  const { db } = await connectToDatabase();
  const blogPosts = serializeDocument(
    await db.collection('blogPosts').find({}).sort({ createdAt: -1 }).toArray()
  );

  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main className='container mx-auto px-4 py-12'>
        <BlogList posts={blogPosts} />
      </main>
    </div>
  );
}
