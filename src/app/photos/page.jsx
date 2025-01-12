import { connectToDatabase } from '@/lib/mongodb';
import PhotoCard from '@/components/PhotoCard';
import { Header } from '@/components/header';
import { serializeDocument } from '@/lib/serialize';

export default async function PhotoGallery() {
  const { db } = await connectToDatabase();
  const photos = serializeDocument(
    await db.collection('images').find({}).toArray()
  );

  console.log('Fetched photos:', JSON.stringify(photos, null, 2));

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-dm-serif mb-8 text-center'>
          Photo Gallery
        </h1>
        {photos.length === 0 ? (
          <p className='text-center text-gray-500'>No photos available.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {photos.map((photo) => (
              <div
                key={photo._id}
                className='aspect-w-1 aspect-h-1'
              >
                <PhotoCard photo={photo} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// import { connectToDatabase } from '@/lib/mongodb';
// import PhotoCard from '@/components/PhotoCard';
// import { Header } from '@/components/header';
// import { serializeDocument } from '@/lib/serialize';

// export default async function PhotoGallery() {
//   const { db } = await connectToDatabase();
//   const photos = serializeDocument(
//     await db.collection('images').find({}).toArray()
//   );

//   console.log('Fetched photos:', JSON.stringify(photos, null, 2));

//   console.log(
//     'Rendering PhotoGallery with NEXT_PUBLIC_BASE_URL:',
//     process.env.NEXT_PUBLIC_BASE_URL
//   );

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       <Header />
//       <div className='container mx-auto px-4 py-8'>
//         <h1 className='text-4xl font-dm-serif mb-8 text-center'>
//           Photo Gallery
//         </h1>
//         {photos.length === 0 ? (
//           <p className='text-center text-gray-500'>No photos available.</p>
//         ) : (
//           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//             {photos.map((photo) => (
//               <div
//                 key={photo._id}
//                 className='aspect-w-1 aspect-h-1'
//               >
//                 <PhotoCard photo={photo} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { connectToDatabase } from '@/lib/mongodb';
// import PhotoCard from '@/components/PhotoCard';
// import { Header } from '@/components/header';
// import { serializeDocument } from '@/lib/serialize';

// export default async function PhotoGallery() {
//   const { db } = await connectToDatabase();
//   const photos = serializeDocument(
//     await db.collection('images').find({}).toArray()

//   );

//   console.log('Fetched photos:', photos);

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       <Header />
//       <div className='container mx-auto px-4 py-8'>
//         <h1 className='text-4xl font-dm-serif mb-8 text-center'>
//           Photo Gallery
//         </h1>
//         {photos.length === 0 ? (
//           <p className='text-center text-gray-500'>No photos available.</p>
//         ) : (
//           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//             {photos.map((photo) => (
//               <div
//                 key={photo._id}
//                 className='aspect-w-1 aspect-h-1'
//               >
//                 <PhotoCard photo={photo} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { connectToDatabase } from '@/lib/mongodb';
// import PhotoCard from '@/components/PhotoCard';
// import { Header } from '@/components/header';
// import { serializeDocument } from '@/lib/serialize';

// export default async function PhotoGallery() {
//   const { db } = await connectToDatabase();
//   const photos = serializeDocument(
//     await db.collection('photos').find({}).toArray()
//   );

//   console.log('Fetched photos:', photos); // Add this line for debugging

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       <Header />
//       <div className='container mx-auto px-4 py-8'>
//         <h1 className='text-4xl font-dm-serif mb-8 text-center'>
//           Photo Gallery
//         </h1>
//         {photos.length === 0 ? (
//           <p className='text-center text-gray-500'>No photos available.</p>
//         ) : (
//           <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//             {photos.map((photo) => (
//               <div
//                 key={photo._id}
//                 className='aspect-w-1 aspect-h-1'
//               >
//                 <PhotoCard photo={photo} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { connectToDatabase } from '@/lib/mongodb'
// import PhotoCard from '@/components/PhotoCard'
// import { Header } from '@/components/header'
// import { serializeDocument } from '@/lib/serialize'

// export default async function PhotoGallery() {
//   const { db } = await connectToDatabase()
//   const photos = serializeDocument(await db.collection('photos').find({}).toArray())

//   console.log('Fetched photos:', photos) // Add this line for debugging

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-dm-serif mb-8 text-center">Photo Gallery</h1>
//         {photos.length === 0 ? (
//           <p className="text-center text-gray-500">No photos available.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {photos.map((photo) => (
//               <div key={photo._id} className="aspect-w-1 aspect-h-1">
//                 <PhotoCard photo={photo} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// import { connectToDatabase } from '@/lib/mongodb'
// import PhotoCard from '@/components/PhotoCard'
// import { Header } from '@/components/header'
// import { serializeDocument } from '@/lib/serialize'

// export default async function PhotoGallery() {
//   const { db } = await connectToDatabase()
//   const photos = serializeDocument(await db.collection('images').find({}).toArray())

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-dm-serif mb-8 text-center">Photo Gallery</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {photos.map((photo) => (
//             <div key={photo._id} className="aspect-w-1 aspect-h-1">
//               <PhotoCard photo={photo} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
