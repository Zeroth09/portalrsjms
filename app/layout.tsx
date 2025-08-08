import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portal Lomba HUT RI Ke-80 RSJ Mutiara Sukma',
  description: 'Portal pendaftaran lomba dalam rangka peringatan HUT Kemerdekaan RI Ke-80 RSJ Mutiara Sukma',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-merah-50 via-putih to-hijau-50">
          {children}
        </div>
      </body>
    </html>
  )
} 