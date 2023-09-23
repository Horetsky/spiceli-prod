import '@/app/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Sofia_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: "--font-montserrat" 
})
const sofia_sans = Sofia_Sans({ 
  subsets: ['cyrillic'], 
  variable: "--font-sofia" 
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
    <html lang="en">
      <body className={`${ montserrat.variable } ${ sofia_sans.variable }`}>
        <main>
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  )
}
