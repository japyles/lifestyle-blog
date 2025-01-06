'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export function MobileNav({ items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='md:hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 hover:bg-gray-100 rounded-full transition-colors'
      >
        {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
      </button>

      {isOpen && (
        <div className='fixed inset-0 top-16 bg-white z-50 p-4'>
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
          </nav>
        </div>
      )}
    </div>
  );
}
