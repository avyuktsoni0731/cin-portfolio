import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono, Crimson_Text } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { getSiteUrl } from '@/lib/site'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const _crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
})

const site = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: site,
  title: {
    default:
      'Avyukt Soni — builder, engineer, full-stack · computer engineering',
    template: '%s · Avyukt Soni',
  },
  description:
    'Avyukt Soni — computer engineering (AMU ZHCET), full-stack at Stick, founder at Continuum. Apps, agents, hardware, DevTools, and build videos on @avyukt_builds.',
  keywords: [
    'Avyukt Soni',
    'full-stack developer',
    'computer engineering',
    'AMU ZHCET',
    'React Native',
    'Next.js',
    'Continuum',
    'Stick',
    'hackathon',
    'IoT',
    'ESP32',
  ],
  authors: [{ name: 'Avyukt Soni', url: site.toString() }],
  creator: 'Avyukt Soni',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site,
    siteName: 'Avyukt Soni',
    title:
      'Avyukt Soni — builder, engineer, full-stack · computer engineering',
    description:
      'Portfolio · full-stack, agents, hardware, student orgs, and shipped work.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avyukt Soni — builder, engineer, full-stack',
    description:
      'Computer engineering, full-stack at Stick, Continuum, apps, hardware, and builds.',
    creator: '@avyukt_soni',
  },
  robots: { index: true, follow: true },
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
    apple: '/apple-icon.png',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${_geist.className} ${_geistMono.className} ${_crimsonText.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
