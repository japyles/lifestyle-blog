'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

export function BlogListClient({ initialPosts, initialTotalPages }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(initialTotalPages || 0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get('search') || '';
  const tag = searchParams.get('tag') || '';
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    if (search || tag || page > 1) {
      fetchPosts();
    }
  }, [search, tag, page]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/posts?page=${page}&search=${encodeURIComponent(search)}${
          tag ? `&tag=${encodeURIComponent(tag)}` : ''
        }`
      );
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
        setTotalPages(Math.ceil(data.pagination.total / 10));
      } else {
        console.error('Error fetching posts:', data.message);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    router.push(`/blog?${newSearchParams.toString()}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='space-y-16'>
      {posts.length === 0 ? (
        <p>No posts found. {search && 'Try a different search term.'}</p>
      ) : (
        <>
          {posts.map((post) => (
            <article
              key={post._id}
              className='grid md:grid-cols-2 gap-8 items-center'
            >
              <div className='relative aspect-square md:aspect-[4/3]'>
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className='object-cover'
                  />
                ) : (
                  <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                    <span className='text-gray-400'>No image</span>
                  </div>
                )}
              </div>
              <div className='space-y-4'>
                <span className='text-[#896632] text-sm tracking-wider'>
                  {post.category}
                </span>
                <h2 className='font-dm-serif text-[#1b1b1b] text-4xl'>
                  {post.title}
                </h2>
                <p className='text-sm text-[#543916]'>
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className='text-[#735126] leading-relaxed'>
                  {post.content.substring(0, 200)}...
                </div>
                <Link
                  href={`/blog/${post._id}`}
                  className='inline-flex items-center gap-2 bg-[#e7d2b7] text-[#543916] px-6 py-2 text-sm hover:bg-[#e7d2b7]/90 transition-colors'
                >
                  READ MORE
                  <ArrowRight className='w-4 h-4' />
                </Link>
              </div>
            </article>
          ))}
          {totalPages > 1 && (
            <div className='flex justify-center space-x-2 mt-8'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded ${
                      page === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowRight } from 'lucide-react';
// import { useSearchParams, useRouter } from 'next/navigation';

// export function BlogListClient({ initialPosts, initialTotalPages }) {
//   const [posts, setPosts] = useState(initialPosts || []);
//   const [loading, setLoading] = useState(false);
//   const [totalPages, setTotalPages] = useState(initialTotalPages || 0);
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const search = searchParams.get('search') || '';
//   const tag = searchParams.get('tag') || '';
//   const page = parseInt(searchParams.get('page') || '1');

//   useEffect(() => {
//     if (search || tag || page > 1) {
//       fetchPosts();
//     }
//   }, [search, tag, page]);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `/api/posts?page=${page}&search=${search}${tag ? `&tag=${tag}` : ''}`
//       );
//       const data = await res.json();
//       if (data.success) {
//         setPosts(data.data);
//         setTotalPages(Math.ceil(data.pagination.total / 10));
//       } else {
//         console.error('Error fetching posts:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//     setLoading(false);
//   };

//   const handlePageChange = (newPage) => {
//     const newSearchParams = new URLSearchParams(searchParams);
//     newSearchParams.set('page', newPage.toString());
//     router.push(`/blog?${newSearchParams.toString()}`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='space-y-16'>
//       {posts.length === 0 ? (
//         <p>No posts found. {search && 'Try a different search term.'}</p>
//       ) : (
//         <>
//           {posts.map((post) => (
//             <article
//               key={post._id}
//               className='grid md:grid-cols-2 gap-8 items-center'
//             >
//               <div className='relative aspect-square md:aspect-[4/3]'>
//                 {post.imageUrl ? (
//                   <Image
//                     src={post.imageUrl}
//                     alt={post.title}
//                     fill
//                     className='object-cover'
//                   />
//                 ) : (
//                   <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
//                     <span className='text-gray-400'>No image</span>
//                   </div>
//                 )}
//               </div>
//               <div className='space-y-4'>
//                 <span className='text-[#896632] text-sm tracking-wider'>
//                   {post.category}
//                 </span>
//                 <h2 className='font-dm-serif text-[#1b1b1b] text-4xl'>
//                   {post.title}
//                 </h2>
//                 <p className='text-sm text-[#543916]'>
//                   {new Date(post.createdAt).toLocaleDateString()}
//                 </p>
//                 <div className='text-[#735126] leading-relaxed'>
//                   {post.content.substring(0, 200)}...
//                 </div>
//                 <Link
//                   href={`/blog/${post._id}`}
//                   className='inline-flex items-center gap-2 bg-[#e7d2b7] text-[#543916] px-6 py-2 text-sm hover:bg-[#e7d2b7]/90 transition-colors'
//                 >
//                   READ MORE
//                   <ArrowRight className='w-4 h-4' />
//                 </Link>
//               </div>
//             </article>
//           ))}
//           {totalPages > 1 && (
//             <div className='flex justify-center space-x-2 mt-8'>
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                 (pageNum) => (
//                   <button
//                     key={pageNum}
//                     onClick={() => handlePageChange(pageNum)}
//                     className={`px-4 py-2 rounded ${
//                       page === pageNum
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 )
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowRight } from 'lucide-react';
// import { useSearchParams } from 'next/navigation';

// export function BlogListClient({ initialPosts, tag }) {
//   const [posts, setPosts] = useState(initialPosts || []);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const searchParams = useSearchParams();
//   const search = searchParams.get('search') || '';

//   useEffect(() => {
//     fetchPosts();
//   }, [currentPage, search, tag]);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `/api/posts?page=${currentPage}&search=${search}${
//           tag ? `&tag=${tag}` : ''
//         }`
//       );
//       const data = await res.json();
//       if (data.success) {
//         setPosts(data.data);
//         setTotalPages(Math.ceil(data.pagination.total / 10));
//       } else {
//         console.error('Error fetching posts:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//     setLoading(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='space-y-16'>
//       {posts.length === 0 ? (
//         <p>No posts found. {search && 'Try a different search term.'}</p>
//       ) : (
//         posts.map((post) => (
//           <article
//             key={post._id}
//             className='grid md:grid-cols-2 gap-8 items-center'
//           >
//             <div className='relative aspect-square md:aspect-[4/3]'>
//               {post.imageUrl ? (
//                 <Image
//                   src={post.imageUrl}
//                   alt={post.title}
//                   fill
//                   className='object-cover'
//                 />
//               ) : (
//                 <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
//                   <span className='text-gray-400'>No image</span>
//                 </div>
//               )}
//             </div>
//             <div className='space-y-4'>
//               <span className='text-[#896632] text-sm tracking-wider'>
//                 {post.category}
//               </span>
//               <h2 className='font-dm-serif text-[#1b1b1b] text-4xl'>
//                 {post.title}
//               </h2>
//               <p className='text-sm text-[#543916]'>
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </p>
//               <div className='text-[#735126] leading-relaxed'>
//                 {post.content.substring(0, 200)}...
//               </div>
//               <Link
//                 href={`/blog/${post._id}`}
//                 className='inline-flex items-center gap-2 bg-[#e7d2b7] text-[#543916] px-6 py-2 text-sm hover:bg-[#e7d2b7]/90 transition-colors'
//               >
//                 READ MORE
//                 <ArrowRight className='w-4 h-4' />
//               </Link>
//             </div>
//           </article>
//         ))
//       )}
//       {totalPages > 1 && (
//         <div className='flex justify-center space-x-2 mt-8'>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-4 py-2 rounded ${
//                 currentPage === page
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowRight } from 'lucide-react';
// import { useSearchParams } from 'next/navigation';

// export function BlogListClient({ initialPosts, tag }) {
//   const [posts, setPosts] = useState(initialPosts || []);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const searchParams = useSearchParams();
//   const search = searchParams.get('search') || '';

//   useEffect(() => {
//     if (!initialPosts || initialPosts.length === 0) {
//       fetchPosts();
//     } else {
//       setTotalPages(Math.ceil(initialPosts.length / 10));
//     }
//   }, [currentPage, search, tag]);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `/api/posts?page=${currentPage}&search=${search}${
//           tag ? `&tag=${tag}` : ''
//         }`
//       );
//       const data = await res.json();
//       if (data.success) {
//         setPosts(data.data);
//         setTotalPages(Math.ceil(data.pagination.total / 10));
//       } else {
//         console.error('Error fetching posts:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//     setLoading(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='space-y-16'>
//       {posts && posts.length === 0 ? (
//         <p>No posts found. {search && 'Try a different search term.'}</p>
//       ) : (
//         posts &&
//         posts.map((post) => (
//           <article
//             key={post._id}
//             className='grid md:grid-cols-2 gap-8 items-center'
//           >
//             <div className='relative aspect-square md:aspect-[4/3]'>
//               {post.imageUrl ? (
//                 <Image
//                   src={post.imageUrl}
//                   alt={post.title}
//                   fill
//                   className='object-cover'
//                 />
//               ) : (
//                 <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
//                   <span className='text-gray-400'>No image</span>
//                 </div>
//               )}
//             </div>
//             <div className='space-y-4'>
//               <span className='text-[#896632] text-sm tracking-wider'>
//                 {post.category}
//               </span>
//               <h2 className='font-dm-serif text-[#1b1b1b] text-4xl'>
//                 {post.title}
//               </h2>
//               <p className='text-sm text-[#543916]'>
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </p>
//               <div className='text-[#735126] leading-relaxed'>
//                 {post.content.substring(0, 200)}...
//               </div>
//               <Link
//                 href={`/blog/${post._id}`}
//                 className='inline-flex items-center gap-2 bg-[#e7d2b7] text-[#543916] px-6 py-2 text-sm hover:bg-[#e7d2b7]/90 transition-colors'
//               >
//                 READ MORE
//                 <ArrowRight className='w-4 h-4' />
//               </Link>
//             </div>
//           </article>
//         ))
//       )}
//       {totalPages > 1 && (
//         <div className='flex justify-center space-x-2 mt-8'>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-4 py-2 rounded ${
//                 currentPage === page
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowRight } from 'lucide-react';
// import { useSearchParams } from 'next/navigation';

// export function BlogListClient() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const searchParams = useSearchParams();
//   const search = searchParams.get('search') || '';

//   useEffect(() => {
//     fetchPosts();
//   }, [currentPage, search]);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `/api/posts?page=${currentPage}&search=${search}`
//       );
//       const data = await res.json();
//       if (data.success) {
//         setPosts(data.data);
//         setTotalPages(Math.ceil(data.pagination.total / 10));
//       } else {
//         console.error('Error fetching posts:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//     setLoading(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='space-y-16'>
//       {posts.length === 0 ? (
//         <p>No posts found. {search && 'Try a different search term.'}</p>
//       ) : (
//         posts.map((post) => (
//           <article
//             key={post._id}
//             className='grid md:grid-cols-2 gap-8 items-center'
//           >
//             <div className='relative aspect-square md:aspect-[4/3]'>
//               {post.imageUrl ? (
//                 <Image
//                   src={post.imageUrl}
//                   alt={post.title}
//                   fill
//                   className='object-cover'
//                 />
//               ) : (
//                 <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
//                   <span className='text-gray-400'>No image</span>
//                 </div>
//               )}
//             </div>
//             <div className='space-y-4'>
//               <span className='text-[#896632] text-sm tracking-wider'>
//                 {post.category}
//               </span>
//               <h2 className='font-dm-serif text-[#1b1b1b] text-4xl'>
//                 {post.title}
//               </h2>
//               <p className='text-sm text-[#543916]'>
//                 {new Date(post.createdAt).toLocaleDateString()}
//               </p>
//               <div className='text-[#735126] leading-relaxed'>
//                 {post.content.substring(0, 200)}...
//               </div>
//               <Link
//                 href={`/blog/${post._id}`}
//                 className='inline-flex items-center gap-2 bg-[#e7d2b7] text-[#543916] px-6 py-2 text-sm hover:bg-[#e7d2b7]/90 transition-colors'
//               >
//                 READ MORE
//                 <ArrowRight className='w-4 h-4' />
//               </Link>
//             </div>
//           </article>
//         ))
//       )}
//       {totalPages > 1 && (
//         <div className='flex justify-center space-x-2 mt-8'>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-4 py-2 rounded ${
//                 currentPage === page
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
