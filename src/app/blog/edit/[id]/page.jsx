import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { serializeDocument } from '@/lib/serialize';
import { Header } from '@/components/header';
import EditBlogPostForm from '@/components/EditBlogPostForm';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

async function getPostData(id) {
  const { db } = await connectToDatabase();
  return serializeDocument(
    await db.collection('blogPosts').findOne({ _id: new ObjectId(id) })
  );
}

export default async function EditBlogPost({ params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin');
  }

  const id = await params.id;
  const post = await getPostData(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-3xl font-bold mb-8'>Edit Blog Post</h1>
        <EditBlogPostForm post={post} />
      </main>
    </div>
  );
}

// import { connectToDatabase } from '@/lib/mongodb';
// import { ObjectId } from 'mongodb';
// import { serializeDocument } from '@/lib/serialize';
// import { Header } from '@/components/header';
// import EditBlogPostForm from '@/components/EditBlogPostForm';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/pages/api/auth/[...nextauth]';
// import { redirect } from 'next/navigation';

// export default async function EditBlogPost({ params }) {
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== 'admin') {
//     redirect('/auth/signin');
//   }

//   const { db } = await connectToDatabase();
//   const post = serializeDocument(
//     await db.collection('blogPosts').findOne({ _id: new ObjectId(params.id) })
//   );

//   if (!post) {
//     return <div>Post not found</div>;
//   }

//   return (
//     <div className='min-h-screen bg-white'>
//       <Header />
//       <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
//         <h1 className='text-3xl font-bold mb-8'>Edit Blog Post</h1>
//         <EditBlogPostForm post={post} />
//       </main>
//     </div>
//   );
// }
