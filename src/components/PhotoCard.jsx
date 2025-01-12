'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  VKIcon,
  VKShareButton,
} from 'next-share';

export default function PhotoCard({ photo }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = `/api/image${photo.url}`;

  useEffect(() => {
    console.log('PhotoCard rendered with photo:', photo);
    console.log('Image URL:', imageUrl);
  }, [photo, imageUrl]);

  if (!photo || !photo.url) {
    console.error('Invalid photo data:', photo);
    return null;
  }

  return (
    <div
      className='relative w-full h-0 pb-[100%] overflow-hidden rounded-lg shadow-lg group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageError ? (
        <div className='absolute inset-0 bg-gray-200 flex items-center justify-center'>
          <span className='text-gray-500'>Image not available</span>
        </div>
      ) : (
        <Image
          src={imageUrl}
          alt={photo.title || 'Photo'}
          layout='fill'
          objectFit='cover'
          className='transition-transform duration-300 group-hover:scale-105 group-hover:opacity-50'
          onError={(e) => {
            console.error('Failed to load image:', imageUrl, e);
            setImageError(true);
          }}
        />
      )}
      <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4'>
        <div>
          <h3 className='text-xl font-bold mb-1 text-white group-hover:text-slate-900 transition-colors duration-300'>
            {photo.title || 'Untitled'}
          </h3>
          <p className='text-sm mb-2 text-gray-200 group-hover:text-slate-900 transition-colors duration-300'>
            {photo.uploadedAt
              ? new Date(photo.uploadedAt).toLocaleDateString()
              : 'Date unknown'}
          </p>
          <p className='text-sm mb-4 text-gray-200 group-hover:text-slate-900 transition-colors duration-300'>
            {photo.description || 'No description available'}
          </p>
        </div>
        <div className='flex space-x-2'>
          <FacebookShareButton
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
          >
            <FacebookIcon
              size={32}
              round
            />
          </FacebookShareButton>
          <TwitterShareButton
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
            title={photo.title}
          >
            <TwitterIcon
              size={32}
              round
            />
          </TwitterShareButton>
          <VKShareButton
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
          >
            <VKIcon
              size={32}
              round
            />
          </VKShareButton>
        </div>
      </div>
    </div>
  );
}

PhotoCard.propTypes = {
  photo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    uploadedAt: PropTypes.string,
  }).isRequired,
};

// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import PropTypes from 'prop-types';
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   LinkedinShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   LinkedinIcon,
// } from 'next-share';

// export default function PhotoCard({ photo }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   const imageUrl = `/api/image${photo.url}`;

//   useEffect(() => {
//     console.log('PhotoCard rendered with photo:', photo);
//     console.log('Image URL:', imageUrl);
//   }, [photo, imageUrl]);

//   if (!photo || !photo.url) {
//     console.error('Invalid photo data:', photo);
//     return null;
//   }

//   return (
//     <div
//       className='relative w-full h-0 pb-[100%] overflow-hidden rounded-lg shadow-lg group'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {imageError ? (
//         <div className='absolute inset-0 bg-gray-200 flex items-center justify-center'>
//           <span className='text-gray-500'>Image not available</span>
//         </div>
//       ) : (
//         <Image
//           src={imageUrl}
//           alt={photo.title || 'Photo'}
//           layout='fill'
//           objectFit='cover'
//           className='transition-transform duration-300 group-hover:scale-105 group-hover:opacity-50'
//           onError={(e) => {
//             console.error('Failed to load image:', imageUrl, e);
//             setImageError(true);
//           }}
//         />
//       )}
//       <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4'>
//         <div>
//           <h3 className='text-xl font-bold mb-1 text-white group-hover:text-[coral] transition-colors duration-300'>
//             {photo.title || 'Untitled'}
//           </h3>
//           <p className='text-sm mb-2 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300'>
//             {photo.uploadedAt
//               ? new Date(photo.uploadedAt).toLocaleDateString()
//               : 'Date unknown'}
//           </p>
//           <p className='text-sm mb-4 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300'>
//             {photo.description || 'No description available'}
//           </p>
//         </div>
//         <div className='flex space-x-2'>
//           <FacebookShareButton
//             url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
//           >
//             <FacebookIcon
//               size={32}
//               round
//             />
//           </FacebookShareButton>
//           <TwitterShareButton
//             url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
//             title={photo.title}
//           >
//             <TwitterIcon
//               size={32}
//               round
//             />
//           </TwitterShareButton>
//           <LinkedinShareButton
//             url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
//           >
//             <LinkedinIcon
//               size={32}
//               round
//             />
//           </LinkedinShareButton>
//         </div>
//       </div>
//     </div>
//   );
// }

// PhotoCard.propTypes = {
//   photo: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     url: PropTypes.string.isRequired,
//     uploadedAt: PropTypes.string,
//   }).isRequired,
// };

// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import PropTypes from 'prop-types';
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   LinkedinShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   LinkedinIcon,
// } from 'next-share';

// export default function PhotoCard({ photo }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${photo.url}`;

//   useEffect(() => {
//     console.log('PhotoCard rendered with photo:', photo);
//     console.log('Image URL:', imageUrl);
//   }, [photo, imageUrl]);

//   if (!photo || !photo.url) {
//     console.error('Invalid photo data:', photo);
//     return null;
//   }

//   return (
//     <div
//       className='relative w-full h-full overflow-hidden rounded-lg shadow-lg group'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {imageError ? (
//         <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
//           <span className='text-gray-500'>Image not available</span>
//         </div>
//       ) : (
//         <Image
//           src={imageUrl}
//           alt={photo.title || 'Photo'}
//           fill
//           className='object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-50'
//           sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
//           onError={(e) => {
//             console.error('Failed to load image:', imageUrl, e);
//             setImageError(true);
//           }}
//         />
//       )}
//       <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//         <div className='absolute inset-0 p-4 flex flex-col justify-between'>
//           <div>
//             <h3 className='text-xl font-bold mb-1 text-white group-hover:text-[coral] transition-colors duration-300'>
//               {photo.title || 'Untitled'}
//             </h3>
//             <p className='text-sm mb-2 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300'>
//               {photo.uploadedAt
//                 ? new Date(photo.uploadedAt).toLocaleDateString()
//                 : 'Date unknown'}
//             </p>
//             <p className='text-sm mb-4 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300'>
//               {photo.description || 'No description available'}
//             </p>
//           </div>
//           <div className='flex space-x-2'>
//             <FacebookShareButton
//               url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
//             >
//               <FacebookIcon
//                 size={32}
//                 round
//               />
//             </FacebookShareButton>
//             <TwitterShareButton
//               url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
//               title={photo.title}
//             >
//               <TwitterIcon
//                 size={32}
//                 round
//               />
//             </TwitterShareButton>
//             <LinkedinShareButton
//               url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
//             >
//               <LinkedinIcon
//                 size={32}
//                 round
//               />
//             </LinkedinShareButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// PhotoCard.propTypes = {
//   photo: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     url: PropTypes.string.isRequired,
//     uploadedAt: PropTypes.string,
//   }).isRequired,
// };

// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import PropTypes from 'prop-types';
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   LinkedinShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   LinkedinIcon,
// } from 'next-share';

// export default function PhotoCard({ photo }) {
//   console.log(
//     'PhotoCard rendered with photo:',
//     photo,
//     'NEXT_PUBLIC_BASE_URL:',
//     process.env.NEXT_PUBLIC_BASE_URL
//   );
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   useEffect(() => {
//     console.log('PhotoCard rendered with photo:', photo);
//   }, [photo]);

//   if (!photo || !photo.url) {
//     console.error('Invalid photo data:', photo);
//     return null;
//   }

//   const imageUrl = photo.url.startsWith('http')
//     ? photo.url
//     : photo.url.startsWith('/')
//     ? `${process.env.NEXT_PUBLIC_BASE_URL || ''}${photo.url}`
//     : `/${photo.url}`;

//   return (
//     <div
//       className='relative w-full h-full overflow-hidden rounded-lg shadow-lg group'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {imageError ? (
//         <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
//           <span className='text-gray-500'>Image not available</span>
//         </div>
//       ) : (
//         <Image
//           src={imageUrl}
//           alt={photo.title || 'Photo'}
//           fill
//           className='object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-50'
//           sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
//           onError={(e) => {
//             console.error('Failed to load image:', imageUrl, e);
//             setImageError(true);
//           }}
//         />
//       )}
//       <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//         <div className='absolute inset-0 p-4 flex flex-col justify-between'>
//           <div>
//             <h3 className='text-xl font-bold mb-1 text-white group-hover:text-[coral] transition-colors duration-300'>
//               {photo.title || 'Untitled'}
//             </h3>
//             <p className='text-sm mb-2 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300'>
//               {photo.uploadedAt
//                 ? new Date(photo.uploadedAt).toLocaleDateString()
//                 : 'Date unknown'}
//             </p>
//             <p className='text-sm mb-4 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300'>
//               {photo.description || 'No description available'}
//             </p>
//           </div>
//           <div className='flex space-x-2'>
//             <FacebookShareButton
//               url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
//             >
//               <FacebookIcon
//                 size={32}
//                 round
//               />
//             </FacebookShareButton>
//             <TwitterShareButton
//               url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
//               title={photo.title}
//             >
//               <TwitterIcon
//                 size={32}
//                 round
//               />
//             </TwitterShareButton>
//             <LinkedinShareButton
//               url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}
//             >
//               <LinkedinIcon
//                 size={32}
//                 round
//               />
//             </LinkedinShareButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// PhotoCard.propTypes = {
//   photo: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     url: PropTypes.string.isRequired,
//     uploadedAt: PropTypes.string,
//   }).isRequired,
// };

// 'use client'

// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import PropTypes from 'prop-types'
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   LinkedinShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   LinkedinIcon,
// } from 'next-share'

// export default function PhotoCard({ photo }) {
//   const [isHovered, setIsHovered] = useState(false)
//   const [imageError, setImageError] = useState(false)

//   useEffect(() => {
//     console.log('PhotoCard rendered with photo:', photo)
//   }, [photo])

//   if (!photo || !photo.url) {
//     console.error('Invalid photo data:', photo)
//     return null
//   }

//   const imageUrl = photo.url.startsWith('http') ? photo.url : `${process.env.NEXT_PUBLIC_BASE_URL}${photo.url}`

//   return (
//     <div
//       className="relative w-full h-full overflow-hidden rounded-lg shadow-lg group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {imageError ? (
//         <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//           <span className="text-gray-500">Image not available</span>
//         </div>
//       ) : (
//         <Image
//           src={imageUrl}
//           alt={photo.title || 'Photo'}
//           fill
//           className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-50"
//           sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//           onError={(e) => {
//             console.error('Failed to load image:', imageUrl, e)
//             setImageError(true)
//           }}
//         />
//       )}
//       <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//         <div className="absolute inset-0 p-4 flex flex-col justify-between">
//           <div>
//             <h3 className="text-xl font-bold mb-1 text-white group-hover:text-[coral] transition-colors duration-300">{photo.title || 'Untitled'}</h3>
//             <p className="text-sm mb-2 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300">
//               {photo.uploadedAt ? new Date(photo.uploadedAt).toLocaleDateString() : 'Date unknown'}
//             </p>
//             <p className="text-sm mb-4 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300">
//               {photo.description || 'No description available'}
//             </p>
//           </div>
//           <div className="flex space-x-2">
//             <FacebookShareButton url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}>
//               <FacebookIcon size={32} round />
//             </FacebookShareButton>
//             <TwitterShareButton url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`} title={photo.title}>
//               <TwitterIcon size={32} round />
//             </TwitterShareButton>
//             <LinkedinShareButton url={`${process.env.NEXT_PUBLIC_BASE_URL}/photo/${photo._id}`}>
//               <LinkedinIcon size={32} round />
//             </LinkedinShareButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// PhotoCard.propTypes = {
//   photo: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     url: PropTypes.string.isRequired,
//     uploadedAt: PropTypes.string,
//   }).isRequired,
// }

// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import PropTypes from 'prop-types';
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   LinkedinShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   LinkedinIcon,
// } from 'next-share';

// export default function PhotoCard({ photo }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   if (!photo || !photo.url) {
//     console.error('Invalid photo data:', photo);
//     return null;
//   }

//   return (
//     <div
//       className='relative w-full h-full overflow-hidden rounded-lg shadow-lg group'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {imageError ? (
//         <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
//           <span className='text-gray-500'>Image not available</span>
//         </div>
//       ) : (
//         <Image
//           src={photo.url}
//           alt={photo.title || 'Photo'}
//           fill
//           className='object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-50'
//           sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
//           onError={() => {
//             console.error('Failed to load image:', photo.url);
//             setImageError(true);
//           }}
//         />
//       )}
//       <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//         <div className='absolute inset-0 p-4 flex flex-col justify-between'>
//           <div>
//             <h3 className='text-xl font-bold mb-1 text-white group-hover:text-[coral] transition-colors duration-300'>
//               {photo.title || 'Untitled'}
//             </h3>
//             <p className='text-sm mb-2 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300'>
//               {photo.uploadedAt
//                 ? new Date(photo.uploadedAt).toLocaleDateString()
//                 : 'Date unknown'}
//             </p>
//             <p className='text-sm mb-4 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300'>
//               {photo.description || 'No description available'}
//             </p>
//           </div>
//           <div className='flex space-x-2'>
//             <FacebookShareButton
//               url={`https://yourdomain.com/photo/${photo._id}`}
//             >
//               <FacebookIcon
//                 size={32}
//                 round
//               />
//             </FacebookShareButton>
//             <TwitterShareButton
//               url={`https://yourdomain.com/photo/${photo._id}`}
//               title={photo.title}
//             >
//               <TwitterIcon
//                 size={32}
//                 round
//               />
//             </TwitterShareButton>
//             <LinkedinShareButton
//               url={`https://yourdomain.com/photo/${photo._id}`}
//             >
//               <LinkedinIcon
//                 size={32}
//                 round
//               />
//             </LinkedinShareButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// PhotoCard.propTypes = {
//   photo: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     url: PropTypes.string.isRequired,
//     uploadedAt: PropTypes.string,
//     location: PropTypes.string,
//   }).isRequired,
// };

// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import PropTypes from 'prop-types';
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   LinkedinShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   LinkedinIcon,
// } from 'next-share';

// export default function PhotoCard({ photo }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   if (!photo || !photo.url) {
//     console.error('Invalid photo data:', photo);
//     return null;
//   }

//   return (
//     <div
//       className='relative w-full h-full overflow-hidden rounded-lg shadow-lg group'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {imageError ? (
//         <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
//           <span className='text-gray-500'>Image not available</span>
//         </div>
//       ) : (
//         <Image
//           src={photo.url}
//           alt={photo.title || 'Photo'}
//           fill
//           className='object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-50'
//           sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
//           onError={() => {
//             console.error('Failed to load image:', photo.url);
//             setImageError(true);
//           }}
//         />
//       )}
//       <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//         <div className='absolute inset-0 p-4 flex flex-col justify-between'>
//           <div>
//             <h3 className='text-xl font-bold mb-1 text-white group-hover:text-[coral] transition-colors duration-300'>
//               {photo.title || 'Untitled'}
//             </h3>
//             <p className='text-sm mb-2 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300'>
//               {photo.uploadedAt
//                 ? new Date(photo.uploadedAt).toLocaleDateString()
//                 : 'Date unknown'}
//             </p>
//             <p className='text-sm mb-4 text-gray-200 group-hover:text-[#e0e0e0] transition-colors duration-300'>
//               {photo.description || 'No description available'}
//             </p>
//           </div>
//           <div className='flex space-x-2'>
//             <FacebookShareButton
//               url={`https://yourdomain.com/photo/${photo._id}`}
//             >
//               <FacebookIcon
//                 size={32}
//                 round
//               />
//             </FacebookShareButton>
//             <TwitterShareButton
//               url={`https://yourdomain.com/photo/${photo._id}`}
//               title={photo.title}
//             >
//               <TwitterIcon
//                 size={32}
//                 round
//               />
//             </TwitterShareButton>
//             <LinkedinShareButton
//               url={`https://yourdomain.com/photo/${photo._id}`}
//             >
//               <LinkedinIcon
//                 size={32}
//                 round
//               />
//             </LinkedinShareButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// PhotoCard.propTypes = {
//   photo: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     url: PropTypes.string.isRequired,
//     uploadedAt: PropTypes.string,
//   }).isRequired,
// };

// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import PropTypes from 'prop-types'
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   LinkedinShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   LinkedinIcon,
// } from 'next-share'

// export default function PhotoCard({ photo }) {
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <div
//       className="relative w-full h-full overflow-hidden rounded-lg shadow-lg group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Image
//         src={photo.url}
//         alt={photo.title}
//         fill
//         className="object-cover transition-all duration-300 group-hover:opacity-50"
//         sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//       />
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//         <div className="absolute inset-0 p-4 flex flex-col justify-between">
//           <div>
//             <h3 className="text-xl font-bold mb-1 text-white group-hover:text-[coral] transition-colors duration-300">{photo.title}</h3>
//             <p className="text-sm mb-2 text-gray-100 group-hover:text-white transition-colors duration-300">{new Date(photo.uploadedAt).toLocaleDateString()}</p>
//             <p className="text-sm mb-4 text-gray-100 group-hover:text-white transition-colors duration-300">{photo.description}</p>
//           </div>
//           <div className="flex space-x-2">
//             <FacebookShareButton url={`https://yourdomain.com/photo/${photo._id}`}>
//               <FacebookIcon size={32} round />
//             </FacebookShareButton>
//             <TwitterShareButton url={`https://yourdomain.com/photo/${photo._id}`} title={photo.title}>
//               <TwitterIcon size={32} round />
//             </TwitterShareButton>
//             <LinkedinShareButton url={`https://yourdomain.com/photo/${photo._id}`}>
//               <LinkedinIcon size={32} round />
//             </LinkedinShareButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// PhotoCard.propTypes = {
//   photo: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//     uploadedAt: PropTypes.string.isRequired,
//   }).isRequired,
// }
