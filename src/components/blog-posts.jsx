'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function BlogPosts({ posts }) {
  const [imageErrors, setImageErrors] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('Posts received:', posts);
  }, [posts]);

  const handleImageError = (postId, error) => {
    console.error(`Image loading error for post ${postId}:`, error);
    setImageErrors((prev) => ({ ...prev, [postId]: true }));
  };

  const getImageUrl = (url) => {
    if (!url) return '/placeholder.svg?height=400&width=600';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;
    return `/uploads/${url}`;
  };

  if (!mounted) {
    return null; // or a loading placeholder
  }

  return (
    <div className='space-y-12'>
      {posts.map((post) => {
        console.log(`Processing post ${post._id}:`, post);

        const imageUrl = getImageUrl(post.imageUrl);

        console.log(`Post ${post._id} final image URL:`, imageUrl);

        return (
          <article
            key={post._id}
            className='space-y-4'
          >
            <Link
              href={`/blog/${post._id}`}
              className='block group'
            >
              <div className='relative aspect-[16/9] overflow-hidden bg-gray-100'>
                {imageErrors[post._id] ? (
                  <div className='absolute inset-0 flex items-center justify-center text-gray-500'>
                    Image failed to load
                  </div>
                ) : (
                  <Image
                    src={imageUrl || '/placeholder.svg'}
                    alt={post.title || 'Blog post image'}
                    width={800}
                    height={450}
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                    onError={(e) => handleImageError(post._id, e)}
                  />
                )}
              </div>
              <div className='mt-6 space-y-3'>
                <h2 className='font-dm-serif text-3xl group-hover:text-gray-600 transition-colors'>
                  {post.title}
                </h2>
                <p className='text-sm text-gray-500'>
                  {new Date(post.createdAt).toISOString().split('T')[0]} -{' '}
                  {post.author || 'Anonymous'}
                </p>
                <p className='text-gray-600 leading-relaxed'>
                  {post.content.substring(0, 200)}...
                </p>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// export function BlogPosts({ posts }) {
//   const [imageErrors, setImageErrors] = useState({});
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     console.log('Posts received:', posts);
//   }, [posts]);

//   const handleImageError = (postId, error) => {
//     console.error(`Image loading error for post ${postId}:`, error);
//     setImageErrors((prev) => ({ ...prev, [postId]: true }));
//   };

//   if (!mounted) {
//     return null; // or a loading placeholder
//   }

//   return (
//     <div className='space-y-12'>
//       {posts.map((post) => {
//         console.log(`Processing post ${post._id}:`, post);

//         const imageUrl =
//           post.imageUrl && post.imageUrl.startsWith('http')
//             ? post.imageUrl
//             : post.imageUrl
//             ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.imageUrl}`
//             : '/placeholder.svg?height=400&width=600';

//         console.log(`Post ${post._id} final image URL:`, imageUrl);

//         return (
//           <article
//             key={post._id}
//             className='space-y-4'
//           >
//             <Link
//               href={`/blog/${post._id}`}
//               className='block group'
//             >
//               <div className='relative aspect-[16/9] overflow-hidden bg-gray-100'>
//                 {imageErrors[post._id] ? (
//                   <div className='absolute inset-0 flex items-center justify-center text-gray-500'>
//                     Image failed to load
//                   </div>
//                 ) : (
//                   <Image
//                     src={imageUrl || '/placeholder.svg'}
//                     alt={post.title}
//                     fill
//                     className='object-cover transition-transform duration-300 group-hover:scale-105'
//                     onError={(e) => handleImageError(post._id, e)}
//                     sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
//                   />
//                 )}
//               </div>
//               <div className='mt-6 space-y-3'>
//                 <h2 className='font-dm-serif text-3xl group-hover:text-gray-600 transition-colors'>
//                   {post.title}
//                 </h2>
//                 <p className='text-sm text-gray-500'>
//                   {new Date(post.createdAt).toISOString().split('T')[0]} -{' '}
//                   {post.author || 'Anonymous'}
//                 </p>
//                 <p className='text-gray-600 leading-relaxed'>
//                   {post.content.substring(0, 200)}...
//                 </p>
//               </div>
//             </Link>
//           </article>
//         );
//       })}
//     </div>
//   );
// }

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// export function BlogPosts({ posts }) {
//   const [imageErrors, setImageErrors] = useState({});

//   useEffect(() => {
//     console.log('Posts received:', posts);
//   }, [posts]);

//   const handleImageError = (postId, error) => {
//     console.error(`Image loading error for post ${postId}:`, error);
//     setImageErrors((prev) => ({ ...prev, [postId]: true }));
//   };

//   return (
//     <div className='space-y-12'>
//       {posts.map((post) => {
//         console.log(`Processing post ${post._id}:`, post);

//         const imageUrl =
//           post.imageUrl && post.imageUrl.startsWith('http')
//             ? post.imageUrl
//             : post.imageUrl
//             ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.imageUrl}`
//             : '/placeholder.svg?height=400&width=600';

//         console.log(`Post ${post._id} final image URL:`, imageUrl);

//         return (
//           <article
//             key={post._id}
//             className='space-y-4'
//           >
//             <Link
//               href={`/blog/${post._id}`}
//               className='block group'
//             >
//               <div className='relative aspect-[16/9] overflow-hidden bg-gray-100'>
//                 {imageErrors[post._id] ? (
//                   <div className='absolute inset-0 flex items-center justify-center text-gray-500'>
//                     Image failed to load
//                   </div>
//                 ) : (
//                   <Image
//                     src={imageUrl || '/placeholder.svg'}
//                     alt={post.title}
//                     fill
//                     className='object-cover transition-transform duration-300 group-hover:scale-105'
//                     onError={(e) => handleImageError(post._id, e)}
//                     sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
//                   />
//                 )}
//               </div>
//               <div className='mt-6 space-y-3'>
//                 <h2 className='font-dm-serif text-3xl group-hover:text-gray-600 transition-colors'>
//                   {post.title}
//                 </h2>
//                 <p className='text-sm text-gray-500'>
//                   {new Date(post.createdAt).toLocaleDateString()} -{' '}
//                   {post.author || 'Anonymous'}
//                 </p>
//                 <p className='text-gray-600 leading-relaxed'>
//                   {post.content.substring(0, 200)}...
//                 </p>
//               </div>
//             </Link>
//           </article>
//         );
//       })}
//     </div>
//   );
// }

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';

// export function BlogPosts({ posts }) {
//   const [imageErrors, setImageErrors] = useState({});

//   const handleImageError = (postId, error) => {
//     console.error(`Image loading error for post ${postId}:`, error);
//     setImageErrors((prev) => ({ ...prev, [postId]: true }));
//   };

//   return (
//     <div className='space-y-12'>
//       {posts.map((post) => {
//         // Log the image URL for debugging
//         console.log(`Post ${post._id} image URL:`, post.imageUrl);

//         const imageUrl =
//           post.imageUrl && post.imageUrl.startsWith('http')
//             ? post.imageUrl
//             : post.imageUrl
//             ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.imageUrl}`
//             : '/placeholder.svg?height=400&width=600';

//         // Log the final computed URL
//         console.log(`Post ${post._id} final URL:`, imageUrl);

//         return (
//           <article
//             key={post._id}
//             className='space-y-4'
//           >
//             <Link
//               href={`/blog/${post._id}`}
//               className='block group'
//             >
//               <div className='relative aspect-[16/9] overflow-hidden bg-gray-100'>
//                 {imageErrors[post._id] ? (
//                   <div className='absolute inset-0 flex items-center justify-center text-gray-500'>
//                     Image failed to load
//                   </div>
//                 ) : (
//                   <Image
//                     src={imageUrl || '/placeholder.svg'}
//                     alt={post.title}
//                     fill
//                     className='object-cover transition-transform duration-300 group-hover:scale-105'
//                     onError={(e) => handleImageError(post._id, e)}
//                     sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
//                   />
//                 )}
//               </div>
//               <div className='mt-6 space-y-3'>
//                 <h2 className='font-dm-serif text-3xl group-hover:text-gray-600 transition-colors'>
//                   {post.title}
//                 </h2>
//                 <p className='text-sm text-gray-500'>
//                   {new Date(post.createdAt).toLocaleDateString()} -{' '}
//                   {post.author}
//                 </p>
//                 <p className='text-gray-600 leading-relaxed'>
//                   {post.content.substring(0, 200)}...
//                 </p>
//               </div>
//             </Link>
//           </article>
//         );
//       })}
//     </div>
//   );
// }

// import Image from 'next/image';
// import Link from 'next/link';

// export function BlogPosts({ posts }) {
//   return (
//     <div className='space-y-12'>
//       {posts.map((post) => (
//         <article
//           key={post._id}
//           className='space-y-4'
//         >
//           <Link
//             href={`/blog/${post._id}`}
//             className='block group'
//           >
//             <div className='relative aspect-[16/9] overflow-hidden'>
//               <Image
//                 src={
//                   post.imageUrl && post.imageUrl.startsWith('http')
//                     ? post.imageUrl
//                     : post.imageUrl
//                     ? `${process.env.NEXT_PUBLIC_BASE_URL}${post.imageUrl}`
//                     : '/placeholder.svg?height=400&width=600'
//                 }
//                 alt={post.title}
//                 fill
//                 className='object-cover transition-transform duration-300 group-hover:scale-105'
//               />
//             </div>
//             <div className='mt-6 space-y-3'>
//               <h2 className='font-dm-serif text-3xl group-hover:text-gray-600 transition-colors'>
//                 {post.title}
//               </h2>
//               <p className='text-sm text-gray-500'>
//                 {new Date(post.createdAt).toLocaleDateString()} - {post.author}
//               </p>
//               <p className='text-gray-600 leading-relaxed'>
//                 {post.content.substring(0, 200)}...
//               </p>
//             </div>
//           </Link>
//         </article>
//       ))}
//     </div>
//   );
// }

// import Image from 'next/image';
// import Link from 'next/link';
// import { ArrowRight } from 'lucide-react';

// export function BlogPosts({ posts }) {
//   return (
//     <div className='space-y-12'>
//       {posts.map((post) => (
//         <article
//           key={post._id}
//           className='space-y-4'
//         >
//           <Link
//             href={`/blog/${post._id}`}
//             className='block group'
//           >
//             <div className='relative aspect-[16/9] overflow-hidden'>
//               <Image
//                 src={post.imageUrl || '/placeholder.svg?height=400&width=600'}
//                 alt={post.title}
//                 fill
//                 className='object-cover transition-transform duration-300 group-hover:scale-105'
//               />
//             </div>
//             <div className='mt-6 space-y-3'>
//               <h2 className='font-dm-serif text-3xl group-hover:text-gray-600 transition-colors'>
//                 {post.title}
//               </h2>
//               <p className='text-sm text-gray-500'>
//                 {new Date(post.createdAt).toLocaleDateString()} - {post.author}
//               </p>
//               <p className='text-gray-600 leading-relaxed'>
//                 {post.content.substring(0, 200)}...
//               </p>
//             </div>
//           </Link>
//           <div className='flex flex-wrap gap-2'>
//             {post.tags &&
//               post.tags.map((tag) => (
//                 <Link
//                   key={tag}
//                   href={`/tag/${encodeURIComponent(tag)}`}
//                   className='text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded transition-colors'
//                 >
//                   #{tag}
//                 </Link>
//               ))}
//           </div>
//           <Link
//             href={`/blog/${post._id}`}
//             className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors'
//           >
//             Read More
//             <ArrowRight className='w-4 h-4' />
//           </Link>
//         </article>
//       ))}
//     </div>
//   );
// }
