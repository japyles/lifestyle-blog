'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import ImageUploadForm from '@/components/ImageUploadForm';
import ImageGallery from '@/components/ImageGallery';

export default function Dashboard() {
  const [images, setImages] = useState([]);

  const handleNewImage = (newImage) => {
    setImages([...images, newImage]);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8 text-center'>Dashboard</h1>
        <ImageUploadForm onImageUpload={handleNewImage} />
        <ImageGallery images={images} />
      </div>
    </div>
  );
}
