'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function NavHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        isHome
          ? 'bg-transparent'
          : 'border-b border-border/25 bg-background/75 backdrop-blur-md',
      )}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="font-serif text-lg font-semibold tracking-wide text-foreground transition-opacity hover:opacity-80"
        >
          avyukt soni
        </a>

        <ul
          className={cn(
            'flex gap-8 text-sm',
            isHome ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          <li>
            <a
              href="/about"
              className={cn(
                'transition-colors',
                isHome ? 'hover:opacity-80' : 'hover:text-foreground',
              )}
            >
              about
            </a>
          </li>
          <li>
            <a
              href="/work"
              className={cn(
                'transition-colors',
                isHome ? 'hover:opacity-80' : 'hover:text-foreground',
              )}
            >
              work
            </a>
          </li>
          <li>
            <a
              href="/writing"
              className={cn(
                'transition-colors',
                isHome ? 'hover:opacity-80' : 'hover:text-foreground',
              )}
            >
              writing
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
