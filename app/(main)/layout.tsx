import '@/app/globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Sofia_Sans } from 'next/font/google'
import localFont from 'next/font/local'

import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

import { Toaster } from 'react-hot-toast'
import NextTopLoader from "nextjs-toploader";
import { CartProvider } from "@/providers/cart-provider";

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
  description: 'Припави на будь-який смак',
  // icons: {
  //     icon: `${process.env.NEXT_PUBLIC_API_URL}/icons/logo.png`,
  //     shortcut: `${process.env.NEXT_PUBLIC_API_URL}/icons/logo.png`,
  //     apple: `${process.env.NEXT_PUBLIC_API_URL}/icons/logo.png`,
  // },
  openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_API_URL}`,
      title: "Spiceli",
      description: "Припави на будь-який смак",
      siteName: "Spiceli",
      images: [
          {url: `${process.env.NEXT_PUBLIC_API_URL}/icons/logo.png`}
      ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ua">
    <CartProvider>
          <body className={`${ montserrat.variable } ${ sofia_sans.variable } ${ grechen_fuemen.variable }`}>
              <NextTopLoader
                  color={'hsla(10,100%,58%)'}
                  initialPosition={0.08}
                  crawlSpeed={200}
                  crawl={true}
                  showSpinner={false}
                  easing="ease"
                  speed={200}
                  height={5}
              />
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
    </CartProvider>
    </html>
  )
}
