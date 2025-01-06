import Image from 'next/image';

export default function ImageGallery({ images }) {
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Uploaded Images</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {images.map((image) => (
          <div
            key={image.id}
            className='bg-white p-4 rounded-lg shadow-md'
          >
            <div className='relative aspect-w-16 aspect-h-9 mb-2'>
              <Image
                src={image.preview}
                alt={image.description}
                layout='fill'
                objectFit='cover'
                className='rounded-md'
              />
            </div>
            <p className='font-semibold'>{image.location}</p>
            <p className='text-sm text-gray-600'>{image.date}</p>
            <p className='text-sm mt-2'>{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
