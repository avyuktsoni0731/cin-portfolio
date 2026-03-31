'use client'

export default function NavHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/10">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Name */}
        <a 
          href="/" 
          className="font-serif text-lg font-semibold tracking-wide hover:opacity-75 transition-opacity"
        >
          avyukt soni
        </a>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-sm">
          <li>
            <a 
              href="/about" 
              className="hover:opacity-75 transition-opacity"
            >
              about
            </a>
          </li>
          <li>
            <a 
              href="#work" 
              className="hover:opacity-75 transition-opacity"
            >
              work
            </a>
          </li>
          <li>
            <a 
              href="#writing" 
              className="hover:opacity-75 transition-opacity"
            >
              writing
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
