'use client'

import { useState } from 'react'

export default function SoundToggle() {
  const [isActive, setIsActive] = useState(false)

  const toggleSound = () => {
    setIsActive(!isActive)
  }

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-background/50 border border-border/30 hover:bg-background/80 transition-all duration-200 flex items-center justify-center text-foreground/70 hover:text-foreground"
      aria-label="Toggle ambient sound"
      title={isActive ? 'Sound on' : 'Sound off'}
    >
      {isActive ? (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.5 4.06c0-1.336-1.616-2.318-2.791-1.742l-6.468 3.733A2 2 0 0032H5.5A2.5 2.5 0 003 7.5v8a2.5 2.5 0 002.5 2.5h1.068l6.468 3.733c1.175.576 2.791-.406 2.791-1.742V4.06zM15.3 8.066a.5.5 0 01.707 0l1.46 1.46a.5.5 0 11-.707.707l-1.46-1.46a.5.5 0 010-.707zM18.879 11.645a2.5 2.5 0 00-3.536 0 .5.5 0 00.707.707 1.5 1.5 0 012.122 0 .5.5 0 00.707-.707zM21.414 14.21a5 5 0 00-7.071 0 .5.5 0 00.707.707 4 4 0 015.657 0 .5.5 0 00.707-.707z" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707a1 1 0 011.414 0l.707.707m2.828 4.5a2.5 2.5 0 01-3.536 3.536m5.657-1.414a5 5 0 00-7.07-7.07M9 9h.01"
          />
        </svg>
      )}
    </button>
  )
}
