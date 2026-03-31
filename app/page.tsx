import type { Metadata } from 'next'
import { AmbientVideoProvider } from '@/components/AmbientVideoContext'
import NavHeader from '@/components/NavHeader'
import SoundToggle from '@/components/SoundToggle'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import WorkSection from '@/components/sections/WorkSection'
import ActivityGrid from '@/components/sections/ActivityGrid'
import AchievementsSection from '@/components/sections/AchievementsSection'
import ThoughtsSection from '@/components/sections/ThoughtsSection'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <AmbientVideoProvider>
      <main className="min-h-screen bg-background">
        <NavHeader />
        <HeroSection />
        <SoundToggle />
        <AboutSection />
        <WorkSection />
        <ActivityGrid />
        <AchievementsSection />
        <ThoughtsSection />
        <Footer />
      </main>
    </AmbientVideoProvider>
  )
}
