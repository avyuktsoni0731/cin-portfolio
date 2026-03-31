'use client'

export default function Footer() {
  return (
    <footer className="relative w-full py-16 px-6 bg-background border-t border-border/10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 fade-in-up">
          {/* <a
            href="#"
            className="text-sm hover:opacity-75 transition-opacity"
          >
            prev
          </a> */}

          <div className="font-serif font-semibold tracking-wide">
            avyukt soni
          </div>

          {/* <a
            href="#"
            className="text-sm hover:opacity-75 transition-opacity"
          >
            next
          </a> */}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xs text-foreground/50 fade-in-up">
          <a
            href="https://github.com/avyuktsoni0731"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/75 transition-colors"
          >
            github
          </a>
          <a
            href="https://x.com/avyukt_soni"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/75 transition-colors"
          >
            twitter
          </a>
          <a
            href="mailto:soniavyukt@gmail.com"
            className="hover:text-foreground/75 transition-colors"
          >
            email
          </a>
          <a
            href="https://linkedin.com/in/avyuktsoni0731"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/75 transition-colors"
          >
            linkedin
          </a>
          <a
            href="https://www.instagram.com/avyukt_builds/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/75 transition-colors"
          >
            instagram
          </a>
        </div>

        <div className="text-center mt-12 text-xs text-foreground/30 fade-in-up">
          <p>2026 © avyukt soni. all rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
