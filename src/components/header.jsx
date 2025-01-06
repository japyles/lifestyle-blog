import Link from 'next/link';
import { Search } from 'lucide-react';

export function Header() {
  const navItems = [
    { title: 'ANA SAYFA', href: '/' },
    { title: 'FOTOĞRAFLAR', href: '/fotograflar' },
    { title: 'HAKKIMDA', href: '/hakkimda' },
    { title: 'BLOG', href: '/blog' },
    { title: 'İLETİŞİM', href: '/iletisim' },
  ];

  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 py-6'>
        <nav className='flex items-center justify-between'>
          <Link
            href='/'
            className='font-playfair text-2xl font-bold'
          >
            LifeStyle
          </Link>

          <ul className='hidden md:flex items-center space-x-8'>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className='text-sm tracking-wide hover:text-gray-600 transition-colors'
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
            <Search className='w-5 h-5' />
          </button>
        </nav>
      </div>
    </header>
  );
}
