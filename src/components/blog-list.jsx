import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function BlogList({ posts }) {
  return (
    <div className='space-y-16'>
      {posts.map((post, index) => (
        <article
          key={index}
          className='grid md:grid-cols-2 gap-8 items-center'
        >
          <div className='relative aspect-square md:aspect-[4/3]'>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className='object-cover'
            />
          </div>
          <div className='space-y-4'>
            <span className='text-[#896632] text-sm tracking-wider'>
              {post.category}
            </span>
            <h2 className='font-playfair text-[#1b1b1b] text-4xl'>
              {post.title}
            </h2>
            <p className='text-sm text-[#543916]'>
              {post.date} - {post.author}
            </p>
            <p className='text-[#735126] leading-relaxed'>{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
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
