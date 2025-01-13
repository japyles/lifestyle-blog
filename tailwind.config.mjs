// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
        'dm-serif': ['var(--font-dm-serif-text)'],
        'rubik-vinyl': ['var(--font-rubik-vinyl)'],
        'anton': ['var(--font-anton)'],
        'lilita-one': ['var(--font-lilita-one)'],
        'rowdies': ['var(--font-rowdies)'],
        'permanent-marker': ['var(--font-permanent-marker)'],
        'righteous': ['var(--font-righteous)'],
      },
    },
  },
  plugins: [],
}

export default config 

