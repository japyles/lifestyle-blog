import { Inter, Playfair_Display, DM_Serif_Text, Rubik_Vinyl, Anton, Lilita_One } from 'next/font/google'
import { Providers } from "@/components/Providers"
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const dmSerifText = DM_Serif_Text({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-dm-serif-text'
})
const rubikVinyl = Rubik_Vinyl({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-rubik-vinyl'
})
const anton = Anton({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-anton'
})

const lilitaOne = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lilita-one'
})

export const metadata = {
  title: 'LifeStyle Blog',
  description: 'A modern lifestyle blog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${dmSerifText.variable} ${rubikVinyl.variable} ${anton.variable} ${lilitaOne.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}




// import { Inter, Playfair_Display } from 'next/font/google'
// import { Providers } from "@/components/Providers"
// import './globals.css'

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
// const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

// export const metadata = {
//   title: 'LifeStyle Blog',
//   description: 'A modern lifestyle blog',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.variable} ${playfair.variable} font-sans`}>
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   )
// }

