'use client'

import Link from 'next/link'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-16 px-6 bg-background"
    >
      <div className="max-w-3xl mx-auto">
        <div className="fade-in space-y-6">
          <h2 className="text-2xl md:text-3xl font-serif leading-tight">
            about me
          </h2>

          <div className="space-y-4 text-sm leading-relaxed text-foreground/85">
            <p>
              i&apos;m a builder and hacker obsessed with creating systems that work. since childhood, i&apos;ve been taking things apart and putting them back together — from circuit boards to distributed systems. i discovered hackathons in high school and haven&apos;t stopped building since.
            </p>

            <p>
              now i work at the intersection of real-time data, developer tools, and infrastructure. i love the challenge of making complex systems simple, and creating infrastructure that disappears into the background so developers can focus on what matters.
            </p>

            <p>
              outside of code: experimental music, drone research, building communities, and thinking about systems at 2am.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/about"
              className="text-xs text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              read my full story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
