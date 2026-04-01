import type { Metadata } from 'next'
import Link from 'next/link'
import NavHeader from '@/components/NavHeader'
import { WorkItemsList } from '@/components/WorkItemsList'
import Footer from '@/components/sections/Footer'
import { ALL_WORK_ITEMS } from '@/lib/work-items'
import { NoisePanel } from '@/components/visual/NoisePanel'
import { SectionOrnament, StackLayersMark } from '@/components/visual/DecorIcons'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Projects across full-stack, agents, hardware, DevTools, and hackathon builds.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background">
      <NavHeader />
      <section className="relative w-full overflow-hidden px-6 pb-24 pt-28">
        <div className="mx-auto w-full max-w-3xl">
          <p className="fade-in-up mb-2 font-mono text-xs text-foreground/45">
            <Link href="/" className="hover:text-foreground/70 transition-colors">
              ← home
            </Link>
          </p>

          <div className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="fade-in-up mb-3 text-4xl font-serif font-semibold tracking-tight">
                work
              </h1>
              <p className="fade-in-up max-w-lg text-sm leading-relaxed text-foreground/50">
                everything in one place—ship logs, experiments, and things that
                only made sense after a deadline.
              </p>
            </div>
            <NoisePanel className="hidden shrink-0 p-4 sm:block sm:w-[min(100%,220px)]">
              <StackLayersMark className="h-12 w-full text-foreground" />
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/35">
                catalogue
              </p>
            </NoisePanel>
          </div>

          <SectionOrnament className="mb-14" />

          <WorkItemsList items={ALL_WORK_ITEMS} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
