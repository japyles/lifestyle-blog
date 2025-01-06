import { photos } from '../utils/photoData';
import PhotoCard from '@/components/PhotoCard';
import { Header } from '@/components/header';

export default function PhotoGallery() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8 text-center'>Photo Gallery</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {photos.map((photo) => (
            <div
              key={photo.id}
              className='aspect-[4/3]'
            >
              <PhotoCard photo={photo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
