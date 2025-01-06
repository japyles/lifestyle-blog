import Link from 'next/link';
import { MobileNav } from './mobile-nav';
import { SearchForm } from './search-form';

export function Header() {
  const navItems = [
    { title: 'HOME', href: '/' },
    { title: 'PHOTOS', href: '/photos' },
    { title: 'ABOUT', href: '/about' },
    { title: 'BLOG', href: '/blog' },
    { title: 'CONTACT', href: '/contact' },
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
          <div className='hidden md:block'>
            <SearchForm />
          </div>
          <MobileNav items={navItems} />
        </nav>
      </div>
    </header>
  );
}
