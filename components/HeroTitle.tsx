'use client'

import { useEffect, useState } from 'react'
import { Noto_Nastaliq_Urdu, Noto_Serif, Noto_Serif_Devanagari } from 'next/font/google'

import { DecryptedText } from '@/components/ui/decrypted-text'

const heroTitleSerifLatin = Noto_Serif({
  weight: ['500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const heroTitleSerifDevanagari = Noto_Serif_Devanagari({
  weight: ['400', '600'],
  subsets: ['devanagari'],
  display: 'swap',
})

const heroTitleUrdu = Noto_Nastaliq_Urdu({
  weight: ['400', '600'],
  subsets: ['arabic'],
  display: 'swap',
})

const EN = 'avyukt soni'
const HI = 'अव्युक्त सोनी'
const UR = 'اویوکت سونی'

const URDU_SCRAMBLE =
  'ابپتثجچحخدذرزسشصضطظعغفقکگلمنوہھیءیےٓٗ'

const INTERVAL_MS = 3000

type Lang = 'en' | 'hi' | 'ur'

function nextLang(prev: Lang): Lang {
  if (prev === 'en') return 'hi'
  if (prev === 'hi') return 'ur'
  return 'en'
}

function labelFor(lang: Lang): string {
  if (lang === 'en') return EN
  if (lang === 'hi') return HI
  return UR
}

export function HeroTitle() {
  const [visible, setVisible] = useState(EN)
  const [tickLang, setTickLang] = useState<Lang>('en')
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
        const next = nextLang(prev)
        setVisible(labelFor(next))
        return next
      })
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  const fontClass =
    tickLang === 'hi'
      ? `${heroTitleSerifDevanagari.className} normal-case`
      : tickLang === 'ur'
        ? `${heroTitleUrdu.className} normal-case`
        : `${heroTitleSerifLatin.className} lowercase`

  const segmentLocale =
    tickLang === 'ur' ? 'ur' : tickLang === 'hi' ? 'hi' : 'en'

  return (
    <>
      <span className="sr-only">avyukt soni</span>
      <span
        aria-hidden
        dir={tickLang === 'ur' ? 'rtl' : 'ltr'}
        lang={tickLang === 'ur' ? 'ur' : tickLang === 'hi' ? 'hi' : 'en'}
        className="relative inline-block text-5xl font-bold tracking-tight text-balance text-foreground sm:text-7xl md:text-7xl"
      >
        {reduceMotion ? (
          <span className={fontClass}>{EN}</span>
        ) : (
          <DecryptedText
            text={visible}
            className={fontClass}
            skipInitial
            segmentLocale={segmentLocale}
            scrambleChars={tickLang === 'ur' ? URDU_SCRAMBLE : undefined}
            split={tickLang !== 'ur'}
          />
        )}
      </span>
    </>
  )
}
