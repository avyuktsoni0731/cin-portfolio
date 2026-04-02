'use client'

import { useEffect, useState } from 'react'
import { Noto_Serif, Noto_Serif_Devanagari } from 'next/font/google'

import { DecryptedText } from '@/components/ui/decrypted-text'

const heroTitleSerifLatin = Noto_Serif({
  weight: ['500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const heroTitleSerifDevanagari = Noto_Serif_Devanagari({
  weight: ['500', '600'],
  subsets: ['devanagari'],
  display: 'swap',
})

const EN = 'avyukt soni'
const HI = 'अव्युक्त सोनी'

const INTERVAL_MS = 3000

export function HeroTitle() {
  const [visible, setVisible] = useState(EN)
  const [tickLang, setTickLang] = useState<'en' | 'hi'>('en')
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setVisible(EN)
      setTickLang('en')
      return
    }

    const id = window.setInterval(() => {
      setTickLang((prev) => {
        const next = prev === 'en' ? 'hi' : 'en'
        setVisible(next === 'en' ? EN : HI)
        return next
      })
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  const fontClass =
    tickLang === 'hi'
      ? `${heroTitleSerifDevanagari.className} normal-case`
      : `${heroTitleSerifLatin.className} lowercase`

  return (
    <>
      <span className="sr-only">avyukt soni</span>
      <span
        aria-hidden
        className="relative inline-block text-5xl font-bold tracking-tight text-balance text-foreground sm:text-7xl md:text-7xl"
      >
        {reduceMotion ? (
          <span className={fontClass}>{EN}</span>
        ) : (
          <DecryptedText text={visible} className={fontClass} skipInitial />
        )}
      </span>
    </>
  )
}
