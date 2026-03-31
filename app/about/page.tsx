import type { Metadata } from 'next'
import NavHeader from '@/components/NavHeader'
import { AboutStory } from '@/components/about/AboutStory'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'About',
  description:
    'The longer version — AMU ZHCET, Stick, Continuum, hackathons, student orgs, research, @avyukt_builds, and what gets shipped.',
  alternates: { canonical: '/about' },
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
