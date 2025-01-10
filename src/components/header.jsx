'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { MobileNav } from './mobile-nav'

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const navItems = [
    { title: 'HOME', href: '/' },
    { title: 'PHOTOS', href: '/photos' },
    // { title: 'ABOUT', href: '/about' },
    { title: 'BLOG', href: '/blog' },
    // { title: 'CONTACT', href: '/contact' },
    { title: 'DASHBOARD', href: '/dashboard' },
  ]

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
            <Link href="/" className="font-dm-serif text-2xl font-bold">
              LifeStyle
            </Link>
            <div className="md:hidden">
              <MobileNav items={navItems} session={session} onLogout={handleLogout} />
            </div>
          </div>
          <ul className="hidden md:flex items-center space-x-6">
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
          <form onSubmit={handleSearch} className="relative w-full md:w-64 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}



// 'use client'

// import { useSession, signOut } from 'next-auth/react'
// import Link from 'next/link'
// import { Search } from 'lucide-react'
// import { MobileNav } from './mobile-nav'
// import { SearchForm } from './search-form'

// export function Header() {
//   const { data: session } = useSession()

//   const navItems = [
//     { title: 'HOME', href: '/' },
//     { title: 'PHOTOS', href: '/photos' },
//     { title: 'ABOUT', href: '/about' },
//     { title: 'BLOG', href: '/blog' },
//     { title: 'CONTACT', href: '/contact' },
//     { title: 'DASHBOARD', href: '/dashboard' },
//   ]

//   const handleLogout = async () => {
//     await signOut({ callbackUrl: '/' })
//   }

//   return (
//     <header className="bg-white shadow-sm">
//       <div className="container mx-auto px-4 py-4">
//         <nav className="flex items-center justify-between">
//           <Link href="/" className="font-dm-serif text-2xl font-bold">
//             LifeStyle
//           </Link>
//           <ul className="hidden lg:flex items-center space-x-6">
//             {navItems.map((item) => (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
//                 >
//                   {item.title}
//                 </Link>
//               </li>
//             ))}
//             {session && (
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
//                 >
//                   LOGOUT
//                 </button>
//               </li>
//             )}
//           </ul>
//           <div className="hidden lg:block">
//             <SearchForm />
//           </div>
//           <div className="lg:hidden">
//             <MobileNav items={navItems} session={session} onLogout={handleLogout} />
//           </div>
//         </nav>
//       </div>
//     </header>
//   )
// }

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
