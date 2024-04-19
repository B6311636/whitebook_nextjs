
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from '../components/nav/Navbar'
import Footer from '../components/footer/Footer'
import CartPorvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'
import { getCurrentUser } from '@/actions/getCurrentUser'


const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Whitebook',
  description: 'Best E-book seller',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="th">
        <body className={`${poppins.className}`}>
          <Toaster toastOptions={{
            style: {
              background: 'rgb(51 65 85)',
              color: "#fff"
            }
          }} />
          <CartPorvider>
            <div className='flex flex-col min-h-screen'>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </CartPorvider>
        </body>
      </html>
    </SessionProvider>

  )
}
