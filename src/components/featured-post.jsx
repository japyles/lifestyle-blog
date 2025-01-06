import Image from 'next/image';
import Link from 'next/link';

export function FeaturedPost({ title, date, author, category, image, slug }) {
  return (
    <div className='relative aspect-[16/9] md:aspect-[21/9] overflow-hidden'>
      <Image
        src={image}
        alt={title}
        fill
        className='object-cover'
        priority
      />
      <div className='absolute inset-0 bg-black/20' />
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4'>
        <span className='text-sm tracking-wider mb-4'>{category}</span>
        <h1 className='font-playfair text-4xl md:text-6xl max-w-3xl mb-4'>
          {title}
        </h1>
        <p className='text-sm tracking-wider'>
          {date} - {author}
        </p>
        <Link
          href={`/blog/${slug}`}
          className='mt-4 bg-white text-black px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors'
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
