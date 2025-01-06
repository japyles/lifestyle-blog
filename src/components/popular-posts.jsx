import Image from 'next/image';
import Link from 'next/link';

export function PopularPosts({ posts }) {
  return (
    <div className='bg-white p-6 shadow-sm'>
      <h2 className='font-playfair text-2xl mb-6'>En çok okunanlar</h2>
      <div className='space-y-6'>
        {posts.map((post, index) => (
          <Link
            key={index}
            href={`/blog/${post.slug}`}
            className='flex gap-4 group'
          >
            <div className='relative w-20 h-20 flex-shrink-0'>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className='object-cover rounded'
              />
            </div>
            <div>
              <h3 className='font-playfair group-hover:text-gray-600 transition-colors'>
                {post.title}
              </h3>
              <p className='text-sm text-gray-500 mt-1'>
                {post.date} - {post.author}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
