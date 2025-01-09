// import { connectToDatabase } from '@/lib/mongodb';
// import PhotoCard from '@/components/PhotoCard';
// import { Header } from '@/components/header';
// import { serializeDocument } from '@/lib/serialize';

// export default async function PhotoGallery() {
//   const { db } = await connectToDatabase();
//   const photos = serializeDocument(
//     await db.collection('images').find({}).toArray()
//   );

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       <Header />
//       <div className='container mx-auto px-4 py-8'>
//         <h1 className='text-4xl font-dm-serif mb-8 text-center'>
//           Photo Gallery
//         </h1>
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//           {photos.map((photo) => (
//             <div
//               key={photo._id}
//               className='aspect-w-1 aspect-h-1'
//             >
//               <PhotoCard photo={photo} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




import { connectToDatabase } from '@/lib/mongodb';
import PhotoCard from '@/components/PhotoCard';
import { Header } from '@/components/header';
import { serializeDocument } from '@/lib/serialize';

export default async function PhotoGallery() {
  const { db } = await connectToDatabase();
  const photos = serializeDocument(
    await db.collection('images').find({}).toArray()
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8 text-center uppercase'>Photo Gallery</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {photos.map((photo) => (
            <div
              key={photo._id}
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
