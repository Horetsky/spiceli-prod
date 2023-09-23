import '@/app/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Sofia_Sans } from 'next/font/google'
import localFont from 'next/font/local'

import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

import { Toaster } from 'react-hot-toast'
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: "--font-montserrat" 
})
const sofia_sans = Sofia_Sans({ 
  subsets: ['cyrillic'], 
  variable: "--font-sofia" 
})
const grechen_fuemen = localFont({ 
  src: [
    {
      path: "../../public/fonts/GrechenFuemen-Regular.ttf",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-grechen" 
})

export const metadata: Metadata = {
  title: 'Spiceli',
  description: 'Spiceli - spice shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ua">
      <body className={`${ montserrat.variable } ${ sofia_sans.variable } ${ grechen_fuemen.variable }`}>
        <header>
          <Header />
        </header>

        <main>
          {children}
        </main>

          <Toaster />
          
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
