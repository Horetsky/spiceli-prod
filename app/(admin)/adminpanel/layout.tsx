import '@/app/globals.css'
import "./style.css"
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Sofia_Sans } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'], variable: "--font-montserrat" })
const sofia_sans = Sofia_Sans({ subsets: ['cyrillic'], variable: "--font-sofia" })

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Providers from './Providers'
import { redirect } from "next/navigation"

import Sidebar from './(components)/Sidebar'
import Header from './(components)/Header'

export const metadata: Metadata = {
  title: 'Spice shop',
  description: 'Buy any spices you want',
}
interface IRootLayout {
    children: React.ReactNode
}
export default async function RootLayout( { children } : IRootLayout ) {
  // Getting server Session
  const session = await getServerSession(authOptions)
  console.log("==================", session);
  if (!session) redirect('/logIn?callbackUrl=/adminpanel/products')

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={`${ montserrat.variable } ${ sofia_sans.variable }`}>
        <Toaster />
        <Providers session={session}>
          <div className='adminGridWrapper'>
            <div className='w-full h-full bg-white border-r-[1px] border-secondaryLight px-6'
              style={{gridArea: "sidebar"}}
            >
              <Sidebar />
            </div>
            <div className='w-full h-full border-b-[1px]'
              style={{gridArea: "header"}}
            >
              <Header />
            </div>
            <div className='w-full h-full px-6 pt-9 overflow-scroll'
              style={{gridArea: "main"}}
            >
              { children }
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
