'use client'

import { SectionOrnament } from '@/components/visual/DecorIcons'

export default function Footer() {
  return (
    <footer className="relative w-full bg-background py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionOrnament className="mb-10 max-w-xs mx-auto opacity-60" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 fade-in-up">
          {/* <a
            href="#"
            className="text-sm hover:opacity-75 transition-opacity"
          >
            prev
          </a> */}

          <div className="font-serif font-semibold tracking-wide text-foreground">
            avyukt soni
          </div>

          {/* <a
            href="#"
            className="text-sm hover:opacity-75 transition-opacity"
          >
            next
          </a> */}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xs text-muted-foreground fade-in-up">
          <a
            href="https://github.com/avyuktsoni0731"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            github
          </a>
          <a
            href="https://x.com/avyukt_soni"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            twitter
          </a>
          <a
            href="mailto:soniavyukt@gmail.com"
            className="transition-colors hover:text-foreground"
          >
            email
          </a>
          <a
            href="https://linkedin.com/in/avyuktsoni0731"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            linkedin
          </a>
          <a
            href="https://www.instagram.com/avyukt_builds/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            instagram
          </a>
        </div>

        <div className="mt-12 text-center text-xs text-muted-foreground/70 fade-in-up">
          <p>2026 © avyukt soni. all rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
