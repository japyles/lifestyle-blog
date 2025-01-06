'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageUploadForm({ onImageUpload }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      title: '',
      description: '',
      location: '',
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleInputChange = (index, field, value) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, [field]: value } : img))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`file${index}`, image.file);
      formData.append(`title${index}`, image.title);
      formData.append(`description${index}`, image.description);
      formData.append(`location${index}`, image.location);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setImages([]);
        alert('Images uploaded successfully!');
      } else {
        throw new Error('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'
    >
      <div
        {...getRootProps()}
        className='border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer'
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {images.map((image, index) => (
        <div
          key={index}
          className='flex items-center space-x-4'
        >
          <img
            src={image.preview}
            alt='preview'
            className='w-20 h-20 object-cover'
          />
          <input
            type='text'
            placeholder='Title'
            value={image.title}
            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
            className='flex-1 p-2 border rounded'
          />
          <input
            type='text'
            placeholder='Description'
            value={image.description}
            onChange={(e) =>
              handleInputChange(index, 'description', e.target.value)
            }
            className='flex-1 p-2 border rounded'
          />
          <input
            type='text'
            placeholder='Location'
            value={image.location}
            onChange={(e) =>
              handleInputChange(index, 'location', e.target.value)
            }
            className='flex-1 p-2 border rounded'
          />
        </div>
      ))}
      <button
        type='submit'
        disabled={uploading || images.length === 0}
        className='w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300'
      >
        {uploading ? 'Uploading...' : 'Upload Images'}
      </button>
    </form>
  );
}
