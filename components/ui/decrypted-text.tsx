'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

function graphemes(s: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    return [
      ...new Intl.Segmenter('und', { granularity: 'grapheme' }).segment(s),
    ].map((seg) => seg.segment)
  }
  return Array.from(s)
}

const DEFAULT_SCRAMBLE =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export type DecryptedTextProps = {
  text: string
  className?: string
  /** Characters shown while each slot is still “locking in”. */
  scrambleChars?: string
  /** How long (ms) each character scrambles before it settles on the target. */
  lockMs?: number
  /** Delay (ms) between each character starting its scramble. */
  staggerMs?: number
  /**
   * First paint shows the final string immediately (no decrypt on mount).
   * Later `text` changes still animate.
   */
  skipInitial?: boolean
}

export function DecryptedText({
  text,
  className,
  scrambleChars = DEFAULT_SCRAMBLE,
  lockMs = 380,
  staggerMs = 32,
  skipInitial = true,
}: DecryptedTextProps) {
  const parts = useMemo(() => graphemes(text), [text])
  const [display, setDisplay] = useState<string[]>(() => [...parts])
  const initialSkipRef = useRef(skipInitial)

  useEffect(() => {
    if (initialSkipRef.current) {
      initialSkipRef.current = false
      setDisplay([...parts])
      return
    }

    setDisplay(
      parts.map((target) => {
        if (target === ' ' || target === '\u00A0') return '\u00A0'
        return scrambleChars[
          Math.floor(Math.random() * scrambleChars.length)
        ]!
      }),
    )

    let raf = 0
    const start = performance.now()
    const maxT =
      staggerMs * Math.max(0, parts.length - 1) + lockMs + 80

    const tick = (now: number) => {
      const t = now - start
      const next = parts.map((target, i) => {
        if (target === ' ' || target === '\u00A0') return '\u00A0'
        const lockAt = staggerMs * i + lockMs
        if (t >= lockAt) return target
        return scrambleChars[
          Math.floor(Math.random() * scrambleChars.length)
        ]!
      })
      setDisplay(next)
      if (t < maxT) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, parts, scrambleChars, lockMs, staggerMs])

  return (
    <span className={cn('inline-block', className)} aria-hidden>
      {parts.map((_, i) => (
        <span key={`${i}-${parts[i]}`} className="inline-block">
          {display[i] ?? '\u00A0'}
        </span>
      ))}
    </span>
  )
}
