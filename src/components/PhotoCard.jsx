'use client';

import { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'next-share';

export default function PhotoCard({ photo }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='relative w-full h-full overflow-hidden rounded-lg shadow-lg group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={photo.url}
        alt={photo.title}
        fill
        className='object-cover transition-all duration-300 group-hover:opacity-30'
        sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
      />
      <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <div className='absolute inset-0 p-4 flex flex-col justify-between'>
          <div>
            <h3 className='text-xl font-bold mb-1 text-white group-hover:text-slate-900 transition-colors duration-300'>
              {photo.title}
            </h3>
            <p className='text-sm mb-2 text-gray-100 group-hover:text-white transition-colors duration-300'>
              {new Date(photo.uploadedAt).toLocaleDateString()}
            </p>
            <p className='text-sm mb-4 text-gray-100 group-hover:text-white transition-colors duration-300'>
              {photo.description}
            </p>
          </div>
          <div className='flex space-x-2'>
            <FacebookShareButton
              url={`https://yourdomain.com/photo/${photo._id}`}
            >
              <FacebookIcon
                size={32}
                round
              />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://yourdomain.com/photo/${photo._id}`}
              title={photo.title}
            >
              <TwitterIcon
                size={32}
                round
              />
            </TwitterShareButton>
            <LinkedinShareButton
              url={`https://yourdomain.com/photo/${photo._id}`}
            >
              <LinkedinIcon
                size={32}
                round
              />
            </LinkedinShareButton>
          </div>
        </div>
      </div>
    </div>
  );
}

PhotoCard.propTypes = {
  photo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    uploadedAt: PropTypes.string.isRequired,
  }).isRequired,
};

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

//   return (
//     <div
//       className='relative w-full h-full overflow-hidden rounded-lg shadow-lg group'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Image
//         src={photo.url}
//         alt={photo.title}
//         fill
//         className='object-cover transition-transform duration-300 group-hover:scale-105'
//         sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
//       />
//       <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//         <div className='absolute inset-0 p-4 flex flex-col justify-between'>
//           <div>
//             <h3 className='text-xl font-bold mb-1 text-white group-hover:text-[seashell] transition-colors duration-300'>
//               {photo.title}
//             </h3>
//             <p className='text-sm mb-2 text-gray-200 group-hover:text-[seashell] transition-colors duration-300'>
//               {new Date(photo.uploadedAt).toLocaleDateString()}
//             </p>
//             <p className='text-sm mb-4 text-gray-200 group-hover:text-[seashell] transition-colors duration-300'>
//               {photo.description}
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
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//     uploadedAt: PropTypes.string.isRequired,
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

//   return (
//     <div
//       className='relative w-full h-full overflow-hidden rounded-lg shadow-lg group'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Image
//         src={photo.url}
//         alt={photo.title}
//         fill
//         className='object-cover transition-transform duration-300 group-hover:scale-105'
//         sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
//       />
//       <div className='absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//         <div className='absolute inset-0 p-4 flex flex-col justify-between'>
//           <div>
//             <h3 className='text-xl font-bold mb-1 text-white group-hover:text-[coral] transition-colors duration-300'>
//               {photo.title}
//             </h3>
//             <p className='text-sm mb-2 text-gray-200 group-hover:text-pink-300 transition-colors duration-300'>
//               {new Date(photo.uploadedAt).toLocaleDateString()}
//             </p>
//             <p className='text-sm mb-4 text-gray-200 group-hover:text-pink-300 transition-colors duration-300'>
//               {photo.description}
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
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//     uploadedAt: PropTypes.string.isRequired,
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

//   return (
//     <div
//       className='relative w-full h-full overflow-hidden rounded-lg shadow-lg group'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Image
//         src={photo.url}
//         alt={photo.title}
//         fill
//         className='object-cover transition-transform duration-300 group-hover:scale-110'
//         sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
//       />
//       <div className='absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100'>
//         <div className='absolute inset-0 p-4 text-white flex flex-col justify-between'>
//           <div>
//             <h3 className='text-xl font-bold mb-1 transition-colors duration-300 group-hover:text-yellow-300'>
//               {photo.title}
//             </h3>
//             <p className='text-sm mb-2 transition-colors duration-300 group-hover:text-gray-300'>
//               {new Date(photo.uploadedAt).toLocaleDateString()}
//             </p>
//             <p className='text-sm mb-4 transition-colors duration-300 group-hover:text-gray-300'>
//               {photo.description}
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
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//     uploadedAt: PropTypes.string.isRequired,
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
//   VKIcon,
//   VKShareButton,
// } from 'next-share';

// export default function PhotoCard({ photo }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className='relative overflow-hidden rounded-lg shadow-lg h-full'
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className='relative w-full h-full'>
//         <Image
//           src={photo.url} // Changed from photo.imageUrl to photo.url
//           alt={photo.title}
//           fill
//           className='object-cover'
//           sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
//         />
//       </div>
//       {isHovered && (
//         <div className='absolute inset-0 bg-black bg-opacity-70 p-4 text-white transition-opacity duration-300'>
//           <h3 className='text-xl font-bold mb-1'>{photo.title}</h3>
//           <p className='text-sm mb-2'>
//             {new Date(photo.uploadedAt).toLocaleDateString()}
//           </p>
//           <p className='text-sm mb-4'>{photo.description}</p>
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
//             <VKShareButton url={`https://yourdomain.com/photo/${photo._id}`}>
//               <VKIcon
//                 size={32}
//                 round
//               />
//             </VKShareButton>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// PhotoCard.propTypes = {
//   photo: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//     uploadedAt: PropTypes.string.isRequired,
//   }).isRequired,
// };
