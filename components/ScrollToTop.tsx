'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const SHOW_AFTER_PX = 320

export function ScrollToTop() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className={cn(
        'group fixed right-6 z-50 flex flex-col items-end gap-1.5 transition-all duration-300',
        isHome ? 'bottom-[4.75rem]' : 'bottom-6',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <p
        className="pointer-events-none select-none text-right font-mono text-[11px] tracking-wide text-muted-foreground/90"
        aria-hidden
      >
        scroll to top
      </p>
      <button
        type="button"
        onClick={scrollToTop}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/35 bg-background/70 text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:border-border/50 hover:bg-background/90 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  )
}
