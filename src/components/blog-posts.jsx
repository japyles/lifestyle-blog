import Image from 'next/image';
import Link from 'next/link';

export function BlogPosts({ posts }) {
  return (
    <div className='space-y-12'>
      {posts.map((post, index) => (
        <article
          key={index}
          className='space-y-4'
        >
          <Link
            href={`/blog/${post.slug}`}
            className='block group'
          >
            <div className='relative aspect-[16/9] overflow-hidden'>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <div className='mt-6 space-y-3'>
              <h2 className='font-playfair text-3xl group-hover:text-gray-600 transition-colors'>
                {post.title}
              </h2>
              <p className='text-sm text-gray-500'>
                {post.date} - {post.author}
              </p>
              <p className='text-gray-600 leading-relaxed'>{post.excerpt}</p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
