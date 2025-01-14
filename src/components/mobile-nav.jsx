'use client';

import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Home,
  Camera,
  User,
  BookOpen,
  Mail,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import SearchBar from './SearchBar';

const getIcon = (title) => {
  switch (title) {
    case 'HOME':
      return <Home className='w-5 h-5' />;
    case 'PHOTOS':
      return <Camera className='w-5 h-5' />;
    case 'ABOUT':
      return <User className='w-5 h-5' />;
    case 'BLOG':
      return <BookOpen className='w-5 h-5' />;
    case 'CONTACT':
      return <Mail className='w-5 h-5' />;
    case 'DASHBOARD':
      return <LayoutDashboard className='w-5 h-5' />;
    default:
      return null;
  }
};

export function MobileNav({ items, session, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className='lg:hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 hover:bg-[#e7d2b7]/10 rounded-full transition-colors'
        aria-label='Toggle menu'
      >
        <Menu className='w-6 h-6 text-[#543916]' />
      </button>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40'
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-[#e7d2b7] to-[#d4b48c] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='p-6 h-full flex flex-col'>
          <div className='flex justify-end'>
            <button
              onClick={() => setIsOpen(false)}
              className='p-2 hover:bg-[#543916]/10 rounded-full transition-colors'
              aria-label='Close menu'
            >
              <X className='w-6 h-6 text-[#543916]' />
            </button>
          </div>

          <div className='mb-8'>
            <SearchBar />
          </div>

          <nav className='space-y-6'>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='flex items-center gap-4 text-[#543916] hover:text-[#543916]/80 transition-colors group'
                onClick={() => setIsOpen(false)}
              >
                <div className='w-8 h-8 flex items-center justify-center rounded-full bg-[#543916]/10 group-hover:bg-[#543916]/20 transition-colors'>
                  {getIcon(item.title)}
                </div>
                <span className='text-lg font-medium'>{item.title}</span>
              </Link>
            ))}
          </nav>

          {session && (
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className='mt-auto flex items-center gap-4 text-[#543916] hover:text-[#543916]/80 transition-colors'
            >
              LOGOUT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   Menu,
//   X,
//   Home,
//   Camera,
//   User,
//   BookOpen,
//   Mail,
//   LayoutDashboard,
// } from 'lucide-react';
// import Link from 'next/link';
// import SearchBar from './SearchBar';

// const getIcon = (title) => {
//   switch (title) {
//     case 'HOME':
//       return <Home className='w-5 h-5' />;
//     case 'PHOTOS':
//       return <Camera className='w-5 h-5' />;
//     case 'ABOUT':
//       return <User className='w-5 h-5' />;
//     case 'BLOG':
//       return <BookOpen className='w-5 h-5' />;
//     case 'CONTACT':
//       return <Mail className='w-5 h-5' />;
//     case 'DASHBOARD':
//       return <LayoutDashboard className='w-5 h-5' />;
//     default:
//       return null;
//   }
// };

// export function MobileNav({
//   items,
//   session,
//   onLogout,
//   searchQuery,
//   setSearchQuery,
//   handleSearch,
// }) {
//   const [isOpen, setIsOpen] = useState(false);

//   // Prevent scrolling when menu is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   return (
//     <div className='lg:hidden'>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className='p-2 hover:bg-[#e7d2b7]/10 rounded-full transition-colors'
//         aria-label='Toggle menu'
//       >
//         <Menu className='w-6 h-6 text-[#543916]' />
//       </button>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40'
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Menu */}
//       <div
//         className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-[#e7d2b7] to-[#d4b48c] z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className='p-6 h-full flex flex-col'>
//           <div className='flex justify-end'>
//             <button
//               onClick={() => setIsOpen(false)}
//               className='p-2 hover:bg-[#543916]/10 rounded-full transition-colors'
//               aria-label='Close menu'
//             >
//               <X className='w-6 h-6 text-[#543916]' />
//             </button>
//           </div>

//           <div className='mb-8'>
//             <SearchBar
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//               handleSearch={handleSearch}
//             />
//           </div>

//           <nav className='space-y-6'>
//             {items.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className='flex items-center gap-4 text-[#543916] hover:text-[#543916]/80 transition-colors group'
//                 onClick={() => setIsOpen(false)}
//               >
//                 <div className='w-8 h-8 flex items-center justify-center rounded-full bg-[#543916]/10 group-hover:bg-[#543916]/20 transition-colors'>
//                   {getIcon(item.title)}
//                 </div>
//                 <span className='text-lg font-medium'>{item.title}</span>
//               </Link>
//             ))}
//           </nav>

//           {session && (
//             <button
//               onClick={() => {
//                 setIsOpen(false);
//                 onLogout();
//               }}
//               className='mt-auto flex items-center gap-4 text-[#543916] hover:text-[#543916]/80 transition-colors'
//             >
//               LOGOUT
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { Menu, X, Home, Camera, User, BookOpen, Mail } from 'lucide-react';
// import Link from 'next/link';
// import SearchBar from './SearchBar';

// const getIcon = (title) => {
//   switch (title) {
//     case 'HOME':
//       return <Home className='w-5 h-5' />;
//     case 'PHOTOS':
//       return <Camera className='w-5 h-5' />;
//     case 'ABOUT':
//       return <User className='w-5 h-5' />;
//     case 'BLOG':
//       return <BookOpen className='w-5 h-5' />;
//     case 'CONTACT':
//       return <Mail className='w-5 h-5' />;
//     default:
//       return null;
//   }
// };

// export function MobileNav({
//   items,
//   session,
//   onLogout,
//   searchQuery,
//   setSearchQuery,
//   handleSearch,
// }) {
//   const [isOpen, setIsOpen] = useState(false);

//   // Prevent scrolling when menu is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   return (
//     <div className='xl:hidden'>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className='p-2 hover:bg-[#e7d2b7]/10 rounded-full transition-colors'
//         aria-label='Toggle menu'
//       >
//         <Menu className='w-6 h-6 text-[#543916]' />
//       </button>

//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40'
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Menu */}
//       <div
//         className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-[#e7d2b7] to-[#d4b48c] z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className='p-6 h-full flex flex-col'>
//           <div className='flex justify-end'>
//             <button
//               onClick={() => setIsOpen(false)}
//               className='p-2 hover:bg-[#543916]/10 rounded-full transition-colors'
//               aria-label='Close menu'
//             >
//               <X className='w-6 h-6 text-[#543916]' />
//             </button>
//           </div>

//           <div className='mb-8'>
//             <SearchBar
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//               handleSearch={handleSearch}
//             />
//           </div>

//           <nav className='space-y-6'>
//             {items.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className='flex items-center gap-4 text-[#543916] hover:text-[#543916]/80 transition-colors group'
//                 onClick={() => setIsOpen(false)}
//               >
//                 <div className='w-8 h-8 flex items-center justify-center rounded-full bg-[#543916]/10 group-hover:bg-[#543916]/20 transition-colors'>
//                   {getIcon(item.title)}
//                 </div>
//                 <span className='text-lg font-medium'>{item.title}</span>
//               </Link>
//             ))}
//           </nav>

//           {session && (
//             <button
//               onClick={() => {
//                 setIsOpen(false);
//                 onLogout();
//               }}
//               className='mt-auto flex items-center gap-4 text-[#543916] hover:text-[#543916]/80 transition-colors'
//             >
//               LOGOUT
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import Link from 'next/link';
// import SearchBar from './SearchBar'; // Assuming SearchBar is the updated component

// export function MobileNav({
//   items,
//   session,
//   onLogout,
//   searchQuery,
//   setSearchQuery,
//   handleSearch,
// }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className='lg:hidden'>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className='p-2 hover:bg-gray-100 rounded-full transition-colors'
//         aria-label='Toggle menu'
//       >
//         {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
//       </button>

//       {isOpen && (
//         <div className='fixed inset-0 top-16 bg-white z-50 p-4'>
//           <div className='xl:hidden mb-6'>
//             {' '}
//             {/* Updated div */}
//             <SearchBar
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//               handleSearch={handleSearch}
//             />
//           </div>
//           <nav className='space-y-4'>
//             {items.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className='block text-lg hover:text-gray-600 transition-colors'
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.title}
//               </Link>
//             ))}
//             {session && (
//               <button
//                 onClick={() => {
//                   setIsOpen(false);
//                   onLogout();
//                 }}
//                 className='block text-lg hover:text-gray-600 transition-colors'
//               >
//                 LOGOUT
//               </button>
//             )}
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import Link from 'next/link';
// import { SearchForm } from './search-form';

// export function MobileNav({ items, session, onLogout}) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className='lg:hidden'>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className='p-2 hover:bg-gray-100 rounded-full transition-colors'
//         aria-label='Toggle menu'
//       >
//         {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
//       </button>

//       {isOpen && (
//         <div className='fixed inset-0 top-16 bg-white z-50 p-4'>
//           <div className='mb-6'>
//             <SearchForm />
//           </div>
//           <nav className='space-y-4'>
//             {items.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className='block text-lg hover:text-gray-600 transition-colors'
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.title}
//               </Link>
//             ))}
//             {session && (
//               <button
//                 onClick={() => {
//                   setIsOpen(false);
//                   onLogout();
//                 }}
//                 className='block text-lg hover:text-gray-600 transition-colors'
//               >
//                 LOGOUT
//               </button>
//             )}
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// }
