import type { Metadata } from 'next'
import NavHeader from '@/components/NavHeader'
import { AboutStory } from '@/components/about/AboutStory'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'About · Avyukt Soni',
  description:
    'Builder, hacker, and computer engineering student at AMU — hackathons, Stick, Continuum, open source, and the long story behind the commits.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <NavHeader />
      <AboutStory />
      <Footer />
    </main>
  )
}
