
'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { MobileNav } from './mobile-nav'
import { SearchForm } from './search-form'

export function Header() {
  const { data: session } = useSession()

  const navItems = [
    { title: 'HOME', href: '/' },
    { title: 'PHOTOS', href: '/photos' },
    { title: 'ABOUT', href: '/about' },
    { title: 'BLOG', href: '/blog' },
    { title: 'CONTACT', href: '/contact' },
    { title: 'DASHBOARD', href: '/dashboard' },
  ]

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="font-dm-serif text-2xl font-bold">
            LifeStyle
          </Link>
          <ul className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            {session && (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  LOGOUT
                </button>
              </li>
            )}
          </ul>
          <div className="hidden lg:block">
            <SearchForm />
          </div>
          <div className="lg:hidden">
            <MobileNav items={navItems} session={session} onLogout={handleLogout} />
          </div>
        </nav>
      </div>
    </header>
  )
}








// 'use client';

// import { useSession, signOut } from 'next-auth/react';
// import Link from 'next/link';
// import { Search } from 'lucide-react';
// import { MobileNav } from './mobile-nav';
// import { SearchForm } from './search-form';

// export function Header() {
//   const { data: session } = useSession();

//   const navItems = [
//     { title: 'HOME', href: '/' },
//     { title: 'PHOTOS', href: '/photos' },
//     { title: 'ABOUT', href: '/about' },
//     { title: 'BLOG', href: '/blog' },
//     { title: 'CONTACT', href: '/contact' },
//     { title: 'DASHBOARD', href: '/dashboard' },
//   ];

//   const handleLogout = async () => {
//     await signOut({ callbackUrl: '/' });
//   };

//   return (
//     <header className='border-b'>
//       <div className='container mx-auto px-4 py-6'>
//         <nav className='flex items-center justify-between'>
//           <Link
//             href='/'
//             className='font-playfair text-2xl font-bold'
//           >
//             LifeStyle
//           </Link>
//           <ul className='hidden md:flex items-center space-x-8'>
//             {navItems.map((item) => (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className='text-sm tracking-wide hover:text-gray-600 transition-colors'
//                 >
//                   {item.title}
//                 </Link>
//               </li>
//             ))}
//             {session && (
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className='text-sm tracking-wide hover:text-gray-600 transition-colors'
//                 >
//                   LOGOUT
//                 </button>
//               </li>
//             )}
//           </ul>
//           <div className='hidden md:block'>
//             <SearchForm />
//           </div>
//           <MobileNav
//             items={navItems}
//             session={session}
//             onLogout={handleLogout}
//           />
//         </nav>
//       </div>
//     </header>
//   );
// }
