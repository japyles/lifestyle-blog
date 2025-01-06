import Image from 'next/image';
import Link from 'next/link';

export function BlogPosts({ posts }) {
  return (
    <div className='space-y-12'>
      {posts.map((post) => (
        <article
          key={post._id}
          className='space-y-4'
        >
          <Link
            href={`/blog/${post._id}`}
            className='block group'
          >
            <div className='relative aspect-[16/9] overflow-hidden'>
              <Image
                src={post.imageUrl || '/placeholder.svg?height=400&width=600'}
                alt={post.title}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <div className='mt-6 space-y-3'>
              <h2 className='font-dm-serif text-3xl group-hover:text-gray-600 transition-colors'>
                {post.title}
              </h2>
              <p className='text-sm text-gray-500'>
                {new Date(post.createdAt).toLocaleDateString()} - {post.author}
              </p>
              <p className='text-gray-600 leading-relaxed'>
                {post.content.substring(0, 200)}...
              </p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
