'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

function graphemes(s: string, locale = 'und'): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    return [
      ...new Intl.Segmenter(locale, { granularity: 'grapheme' }).segment(s),
    ].map((seg) => seg.segment)
  }
  return Array.from(s)
}

function randomGraphemeString(
  template: string,
  scrambleChars: string,
  locale: string,
): string {
  return graphemes(template, locale)
    .map((ch) => {
      if (ch === ' ' || ch === '\u00A0') return '\u00A0'
      return scrambleChars[
        Math.floor(Math.random() * scrambleChars.length)
      ]!
    })
    .join('')
}

const DEFAULT_SCRAMBLE =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()[]{}|;:,.<>?/~`-=+_'

export type DecryptedTextProps = {
  text: string
  className?: string
  scrambleChars?: string
  lockMs?: number
  staggerMs?: number
  skipInitial?: boolean
  /** Locale for grapheme segmentation (e.g. `ur`, `hi`, `en`). */
  segmentLocale?: string
  /**
   * Per-grapheme reveal. Set `false` for Arabic script so joining isn’t broken
   * by one span per letter (Urdu uses whole-line scramble instead).
   */
  split?: boolean
}

export function DecryptedText({
  text,
  className,
  scrambleChars = DEFAULT_SCRAMBLE,
  lockMs = 380,
  staggerMs = 32,
  skipInitial = true,
  segmentLocale = 'und',
  split = true,
}: DecryptedTextProps) {
  const locale = segmentLocale
  const parts = useMemo(() => graphemes(text, locale), [text, locale])
  const [display, setDisplay] = useState<string[]>(() => [...parts])
  const [lineDisplay, setLineDisplay] = useState('')
  const initialSkipRef = useRef(skipInitial)

  useLayoutEffect(() => {
    if (!split) {
      setLineDisplay('')
    }
  }, [text, split])

  useEffect(() => {
    if (!split) {
      if (initialSkipRef.current) {
        initialSkipRef.current = false
        setLineDisplay(text)
        return
      }

      setLineDisplay(randomGraphemeString(text, scrambleChars, locale))

      let raf = 0
      const start = performance.now()

      const tick = (now: number) => {
        const t = now - start
        if (t >= lockMs) {
          setLineDisplay(text)
          return
        }
        setLineDisplay(randomGraphemeString(text, scrambleChars, locale))
        raf = requestAnimationFrame(tick)
      }

      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }

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
  }, [text, parts, scrambleChars, lockMs, staggerMs, split, locale])

  if (!split) {
    return (
      <span className={cn('inline-block', className)} aria-hidden>
        {lineDisplay || text}
      </span>
    )
  }

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
