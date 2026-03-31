import type { Metadata } from 'next'
import NavHeader from '@/components/NavHeader'
import { AboutStory } from '@/components/about/AboutStory'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  title: 'About · Avyukt Soni',
  description:
    'The longer version — AMU ZHCET, Stick, Continuum, hackathons, student orgs, and what gets shipped.',
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
