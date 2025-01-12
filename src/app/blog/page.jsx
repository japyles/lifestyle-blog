import { Suspense } from 'react';
import { Header } from '@/components/header';
import { BlogListClient } from '@/components/BlogListClient';

export default function BlogPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <h1 className='text-4xl font-bold mb-8 text-center'>Blog Posts</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogListClient />
        </Suspense>
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
