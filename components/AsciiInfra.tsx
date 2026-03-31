'use client'

import { useEffect, useRef, useState } from 'react'

/** Plain ASCII (+ - |); no letter-spacing so columns stay aligned. */
const ASCII_INFRA = `      +--------------------+
      |       edge         |
      +----------+---------+
                 |
      +----------+---------+
      |      stream        |
      +----------+---------+
                 |
      +----------+---------+
      |       core         |
      +--------------------+
        *     *     *`

export default function AsciiInfra() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-300 ${
        isHovered ? 'drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]' : ''
      }`}
    >
      <pre
        className={`font-mono text-[11px] sm:text-sm whitespace-pre text-center leading-none ${
          isHovered ? 'text-primary' : 'text-foreground'
        } transition-colors duration-300`}
        style={{ letterSpacing: 0 }}
      >
        {ASCII_INFRA}
      </pre>
    </div>
  )
}
