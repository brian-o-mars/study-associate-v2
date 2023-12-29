import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const barlow = Barlow({ subsets: ['latin'], weight: '400', })

export const metadata: Metadata = {
  title: "Study Associate",
  description: "AI powered study buddy",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={barlow.className}>{children}</body>
      <Toaster />
    </html>
  )
}
