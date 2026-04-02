'use client'

export default function NavHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="font-serif text-lg font-semibold tracking-wide text-foreground transition-opacity hover:opacity-80"
        >
          avyukt soni
        </a>

        <ul className="flex gap-8 text-sm text-foreground">
          <li>
            <a
              href="/about"
              className="transition-colors hover:opacity-80"
            >
              about
            </a>
          </li>
          <li>
            <a
              href="/work"
              className="transition-colors hover:opacity-80"
            >
              work
            </a>
          </li>
          {/* <li>
            <a 
              href="#writing" 
              className="hover:opacity-75 transition-opacity"
            >
              writing
            </a>
          </li> */}
        </ul>
      </nav>
    </header>
  )
}
