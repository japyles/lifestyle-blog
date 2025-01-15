// /** @type {import('next').NextConfig} */
// const config = {
//     images: {
//       domains: ['images.unsplash.com'],
//     },
//     experimental: {
//       turbo: {
//         rules: {
//           '*.css': {
//             loaders: ['css-loader'],
//             as: '*.css'
//           }
//         }
//       }
//     }
//   }
  
//   export default config
  
  
//   /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//         port: '',
//         pathname: '/**',
//       },
//       // Add any other domains you need here, following the same pattern
//     ],
//     domains: ['localhost'],
//   },
//   // experimental: {
//   //   turbo: true,
//   // },
// }

// export default nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['localhost', 'your-production-domain.com'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
//   env: {
//     NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
//   },
//   // experimental: {
//   //   turbo: true,
//   // },
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://lifestyle-blog-kappa.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lifestyle-blog-kappa.vercel.app',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
}

export default nextConfig