import { Header } from '@/components/header';
import { BlogList } from '@/components/blog-list';

const blogPosts = [
  {
    category: 'COFFEE WORLD',
    title: 'Differences between filter coffee and instant coffee',
    date: 'JUNE 10, 2021',
    author: 'SUSAN THOMPSON',
    excerpt:
      'Looking at recent history, coffee, which we can easily say is an important part of our culture, has so many different consumption alternatives that it is inevitable that people mix up their forms. The two types that are most curious about their differences are filter coffee and instant coffee. In this article, we will help you understand the difference between the two and make your choice!',
    image: '/placeholder.svg?height=600&width=800',
    slug: 'filter-coffee-instant-coffee-differences',
  },
  // More blog posts...
];

export default function BlogPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main className='container mx-auto px-4 py-12'>
        <BlogList posts={blogPosts} />
      </main>
    </div>
  );
}
