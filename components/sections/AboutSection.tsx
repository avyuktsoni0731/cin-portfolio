'use client'

import Link from 'next/link'
import { NoisePanel } from '@/components/visual/NoisePanel'
import { SectionOrnament, SproutMark } from '@/components/visual/DecorIcons'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-background/88 py-20 px-6 backdrop-blur-[2px]"
    >
      <div
        className="pointer-events-none absolute -right-16 top-24 hidden h-72 w-72 opacity-[0.06] lg:block"
        aria-hidden
      >
        <SproutMark className="h-full w-full text-foreground" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <SectionOrnament className="mb-10" />

        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-14">
          <div className="mx-auto flex shrink-0 md:mx-0 md:w-36 md:flex-col md:items-center">
            <NoisePanel className="p-5">
              <SproutMark className="mx-auto h-24 w-24 md:h-28 md:w-28" />
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">
                build → ship → learn
              </p>
            </NoisePanel>
          </div>

          <div className="fade-in min-w-0 flex-1 space-y-6">
            <h2 className="font-serif text-2xl leading-tight md:text-3xl">
              about me
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-foreground/85">
              <p>
                i&apos;m a builder and hacker obsessed with creating systems that
                work. since childhood, i&apos;ve been taking things apart and
                putting them back together — from circuit boards to distributed
                systems. i discovered hackathons in high school and haven&apos;t
                stopped building since.
              </p>

              <p>
                now i work at the intersection of real-time data, developer
                tools, and infrastructure. i love the challenge of making
                complex systems simple, and creating infrastructure that
                disappears into the background so developers can focus on what
                matters.
              </p>

              <p>
                outside of code: cameras, edits, the occasional hardware sprint,
                and the kind of problems that only show up at 2am.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs text-foreground/70 transition-colors hover:text-foreground"
              >
                read my full story →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
