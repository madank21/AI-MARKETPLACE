import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'NexusAI | Decentralized AI Marketplace',
  description: 'The next-generation decentralized marketplace for AI models. Deploy, monetize, and discover cutting-edge AI with blockchain-powered ownership.',
  keywords: ['AI', 'marketplace', 'decentralized', 'blockchain', 'machine learning', 'neural networks', 'Web3'],
  authors: [{ name: 'NexusAI' }],
  openGraph: {
    title: 'NexusAI | Decentralized AI Marketplace',
    description: 'The next-generation decentralized marketplace for AI models.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexusAI | Decentralized AI Marketplace',
    description: 'The next-generation decentralized marketplace for AI models.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark bg-background`}>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
