import Image from 'next/image';
import Link from 'next/link';

export function PopularPosts({ posts }) {
  return (
    <div className='bg-white p-6 shadow-sm'>
      <h2 className='font-playfair text-2xl mb-6'>Most Read</h2>
      <div className='space-y-6'>
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post._id}`}
            className='flex gap-4 group'
          >
            <div className='relative w-20 h-20 flex-shrink-0'>
              <Image
                src={post.imageUrl || '/placeholder.svg?height=80&width=80'}
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
                {new Date(post.createdAt).toLocaleDateString()} - {post.author}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
