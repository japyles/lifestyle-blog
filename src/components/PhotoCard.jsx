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
      className='relative overflow-hidden rounded-lg shadow-lg h-full'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative w-full h-full'>
        <Image
          src={photo.url} // Changed from photo.imageUrl to photo.url
          alt={photo.title}
          fill
          className='object-cover'
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
        />
      </div>
      {isHovered && (
        <div className='absolute inset-0 bg-black bg-opacity-70 p-4 text-white transition-opacity duration-300'>
          <h3 className='text-xl font-bold mb-1'>{photo.title}</h3>
          <p className='text-sm mb-2'>
            {new Date(photo.uploadedAt).toLocaleDateString()}
          </p>
          <p className='text-sm mb-4'>{photo.description}</p>
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
      )}
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
