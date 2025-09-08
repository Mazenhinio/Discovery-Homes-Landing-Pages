import './globals.css'
import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { MayaChatbot } from '@/components/MayaChatbot'
import { VapiWidget } from '@/components/VapiWidget'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { AnimationProvider } from '@/components/providers/AnimationProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Discovery Homes | Affordable Modular Homes | Ready When You Are',
  description: 'Discovery Homes delivers high-quality, sustainable, culturally-respectful modular housing across Western Canada. From Indigenous communities to off-grid acreage buyers to resort owners.',
  keywords: [
    'modular homes',
    'affordable housing',
    'sustainable homes',
    'Indigenous housing',
    'off-grid homes',
    'Western Canada',
    'Discovery Homes',
    'net-zero homes',
    'custom modular',
    'resort housing'
  ],
  authors: [{ name: 'Discovery Homes' }],
  creator: 'Discovery Homes',
  publisher: 'Discovery Homes',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://www.discoveryhomes.ca',
    title: 'Discovery Homes | Affordable Modular Homes | Ready When You Are',
    description: 'High-quality, sustainable, culturally-respectful modular housing across Western Canada.',
    siteName: 'Discovery Homes',
    images: [
      {
        url: '/images/OG PIC.png',
        width: 1200,
        height: 630,
        alt: 'Discovery Homes - Affordable Modular Housing',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discovery Homes | Affordable Modular Homes',
    description: 'High-quality, sustainable, culturally-respectful modular housing across Western Canada.',
    images: ['/images/OG PIC.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  // Additional meta tags for better link previews
  other: {
    'msapplication-TileColor': '#ffffff',
    'theme-color': '#ffffff',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Favicon and app icons - Using larger sizes for better visibility */}
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Force larger favicon display */}
        <meta name="msapplication-TileImage" content="/android-chrome-512x512.png" />
        <meta name="msapplication-TileColor" content="#68A71D" />
        
        {/* Preload Open Graph image for faster link previews */}
        <link rel="preload" as="image" href="/images/og-image.webp" />
        
        {/* Additional meta tags for better link previews */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Discovery Homes - Affordable Modular Housing" />
        <meta name="twitter:image:alt" content="Discovery Homes - Affordable Modular Housing" />
        <meta property="og:image" content="/images/OG PIC.png" />
        <meta name="twitter:site" content="@discoveryhomes" />
        <meta name="twitter:creator" content="@discoveryhomes" />
        <link rel="canonical" href="https://www.discoveryhomes.ca" />
        
        {/* Mobile and PWA meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Discovery Homes" />
      </head>
      <body className="min-h-screen flex flex-col">
        <AnimationProvider>
          <SmoothScrollProvider>
            <ToastProvider>
              <AnalyticsProvider>
                <Navigation />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <MayaChatbot />
                <VapiWidget />
              </AnalyticsProvider>
            </ToastProvider>
          </SmoothScrollProvider>
        </AnimationProvider>
        <Analytics />
      </body>
    </html>
  )
} 