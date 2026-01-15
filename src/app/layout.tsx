import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PromoBar from '../components/PromoBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pro Life Clinics',
  description: 'Servicii medicale complete într-un singur loc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body
        className={inter.className}
        style={{
          paddingTop: 'calc(var(--promo-height) + env(safe-area-inset-top))',
        }}
      >
        <PromoBar />
        {children}
      </body>
    </html>
  )
}