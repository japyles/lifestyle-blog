import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function BlogList({ posts }) {
  return (
    <div className='space-y-16'>
      {posts.map((post) => (
        <article
          key={post._id}
          className='grid md:grid-cols-2 gap-8 items-center'
        >
          <div className='relative aspect-square md:aspect-[4/3]'>
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className='object-cover'
              />
            ) : (
              <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                <span className='text-gray-400'>No image</span>
              </div>
            )}
          </div>
          <div className='space-y-4'>
            <span className='text-[#896632] text-sm tracking-wider'>
              {post.category}
            </span>
            <h2 className='font-dm-serif text-[#1b1b1b] text-4xl'>
              {post.title}
            </h2>
            <p className='text-sm text-[#543916]'>
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className='text-[#735126] leading-relaxed'>
              {post.content.substring(0, 200)}...
            </p>
            <Link
              href={`/blog/${post._id}`}
              className='inline-flex items-center gap-2 bg-[#e7d2b7] text-[#543916] px-6 py-2 text-sm hover:bg-[#e7d2b7]/90 transition-colors'
            >
              READ MORE
              <ArrowRight className='w-4 h-4' />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
