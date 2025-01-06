'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchForm() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='relative'
    >
      <input
        type='text'
        placeholder='Search...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
      />
      <button
        type='submit'
        className='absolute right-2 top-1/2 transform -translate-y-1/2'
      >
        <Search className='w-5 h-5 text-gray-500' />
      </button>
    </form>
  );
}
