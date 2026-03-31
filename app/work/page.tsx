import type { Metadata } from 'next'
import Link from 'next/link'
import NavHeader from '@/components/NavHeader'
import { WorkItemsList } from '@/components/WorkItemsList'
import Footer from '@/components/sections/Footer'
import { ALL_WORK_ITEMS } from '@/lib/work-items'

export const metadata: Metadata = {
  title: 'Work · Avyukt Soni',
  description:
    'Projects across full-stack, agents, hardware, DevTools, and hackathon builds.',
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background">
      <NavHeader />
      <section className="relative w-full px-6 pb-24 pt-28">
        <div className="mx-auto w-full max-w-3xl">
          <p className="fade-in-up mb-2 font-mono text-xs text-foreground/45">
            <Link href="/" className="hover:text-foreground/70 transition-colors">
              ← home
            </Link>
          </p>
          <h1 className="fade-in-up mb-3 text-4xl font-serif font-semibold tracking-tight">
            work
          </h1>
          <p className="fade-in-up mb-16 max-w-lg text-sm leading-relaxed text-foreground/50">
            everything in one place—ship logs, experiments, and things that only
            made sense after a deadline.
          </p>

          <WorkItemsList items={ALL_WORK_ITEMS} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
