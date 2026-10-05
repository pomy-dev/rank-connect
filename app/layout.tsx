// app/layout.tsx
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
// Removed: import { useEffect } from 'react' // No longer needed here
import { ServiceWorkerRegister } from '../components/service-worker-resgister' // Import the new client component

export const metadata: Metadata = {
  title: 'RidePay Driver',
  description: 'Fast, trusted fare collection for public transport drivers.',
  generator: 'v0.app',
  manifest: '/manifest.webmanifest', // Ensure this points to your new manifest
  appleWebApp: {
    capable: true,
    title: 'RankConnect',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon-192.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0c8f83',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <ServiceWorkerRegister /> {/* Render the client component */}
      </body>
    </html>
  )
}
