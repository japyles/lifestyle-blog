'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { MobileNav } from './mobile-nav';
import SearchBar from './SearchBar';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const navItems = [
    { title: 'HOME', href: '/' },
    { title: 'PHOTOS', href: '/photos' },
    // { title: 'ABOUT', href: '/about' },
    { title: 'BLOG', href: '/blog' },
    // { title: 'CONTACT', href: '/contact' },
    { title: 'DASHBOARD', href: '/dashboard' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
          <ul className='hidden lg:flex items-center space-x-8'>
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
            {session && (
              <li>
                <button
                  onClick={handleLogout}
                  className='text-sm tracking-wide hover:text-gray-600 transition-colors'
                >
                  LOGOUT
                </button>
              </li>
            )}
          </ul>
          <div className='hidden lg:block'>
            <SearchBar />
          </div>
          <MobileNav
            items={navItems}
            session={session}
            onLogout={handleLogout}
          />
        </nav>
      </div>
    </header>
  );
}
