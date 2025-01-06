'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import ImageUploadForm from '@/components/ImageUploadForm';
import ImageGallery from '@/components/ImageGallery';

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleNewImage = (newImage) => {
    setImages([...images, newImage]);
  };

  const handleSubmit = async () => {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ images }),
    });

    if (response.ok) {
      alert('Images uploaded successfully');
      setImages([]);
    } else {
      alert('Failed to upload images');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8 text-center'>Dashboard</h1>
        <ImageUploadForm onImageUpload={handleNewImage} />
        <ImageGallery images={images} />
        <button
          onClick={handleSubmit}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Submit Images
        </button>
      </div>
    </div>
  );
}
