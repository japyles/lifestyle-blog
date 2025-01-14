'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import ImageUploadForm from '@/components/ImageUploadForm';
import BlogPostForm from '@/components/BlogPostForm';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session || session.user.role !== 'admin') {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== 'admin') {
    return null; // This will be briefly shown before the redirect happens
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8 text-center'>Dashboard</h1>
        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <h2 className='text-2xl font-semibold mb-4'>Upload Images</h2>
            <ImageUploadForm />
          </div>
          <div>
            <h2 className='text-2xl font-semibold mb-4'>Create Blog Post</h2>
            <BlogPostForm />
          </div>
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { Header } from '@/components/header';
// import ImageUploadForm from '@/components/ImageUploadForm';
// import BlogPostForm from '@/components/BlogPostForm';

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (!session || session.user.role !== 'admin') {
//     router.push('/auth/signin');
//     return null;
//   }

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       <Header />
//       <div className='container mx-auto px-4 py-8'>
//         <h1 className='text-3xl font-bold mb-8 text-center'>Dashboard</h1>
//         <div className='grid md:grid-cols-2 gap-8'>
//           <div>
//             <h2 className='text-2xl font-semibold mb-4'>Upload Images</h2>
//             <ImageUploadForm />
//           </div>
//           <div>
//             <h2 className='text-2xl font-semibold mb-4'>Create Blog Post</h2>
//             <BlogPostForm />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
