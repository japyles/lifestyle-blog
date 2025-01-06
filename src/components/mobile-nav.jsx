'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { SearchForm } from './search-form';

export function MobileNav({ items, session, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='md:hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 hover:bg-gray-100 rounded-full transition-colors'
        aria-label='Toggle menu'
      >
        {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
      </button>

      {isOpen && (
        <div className='fixed inset-0 top-16 bg-white z-50 p-4'>
          <div className='mb-6'>
            <SearchForm />
          </div>
          <nav className='space-y-4'>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='block text-lg hover:text-gray-600 transition-colors'
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            {session && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className='block text-lg hover:text-gray-600 transition-colors'
              >
                LOGOUT
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
