'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageUploadForm({ onImageUpload }) {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const newImage = {
            file: file,
            preview: reader.result,
            location: location,
            description: description,
            date: new Date().toISOString().split('T')[0],
          };
          onImageUpload(newImage);
          setLocation('');
          setDescription('');
        };
        reader.readAsDataURL(file);
      });
    },
    [location, description, onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className='mb-8 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold mb-4'>Upload New Image</h2>
      <div
        {...getRootProps()}
        className='border-2 border-dashed border-gray-300 p-6 mb-4 text-center cursor-pointer'
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div className='mb-4'>
        <label
          htmlFor='location'
          className='block text-sm font-medium text-gray-700'
        >
          Location
        </label>
        <input
          type='text'
          id='location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'
        >
          Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          rows='3'
        ></textarea>
      </div>
    </div>
  );
}
