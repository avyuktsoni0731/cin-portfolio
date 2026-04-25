'use client'

import Link from 'next/link'
import { NoisePanel } from '@/components/visual/NoisePanel'
import { SectionOrnament, SproutMark } from '@/components/visual/DecorIcons'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-background/80 py-24 px-6 backdrop-blur-[3px]"
    >
      <div
        className="pointer-events-none absolute -right-16 top-24 hidden h-72 w-72 opacity-[0.06] lg:block"
        aria-hidden
      >
        <SproutMark className="h-full w-full text-muted-foreground/40" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <SectionOrnament className="mb-10" />

        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-8">
          <div className="mx-auto flex shrink-0 md:mx-0 md:w-[200px] md:h-[200px] md:flex-col md:items-center">
            <Image src="/avyukt_builds_pfp.png" alt="Avyukt Soni" width={200} height={200} />
          </div>

          <div className="fade-in min-w-0 flex-1 space-y-6">
            <h2 className="font-serif text-2xl leading-tight md:text-3xl">
              about me
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-foreground/75">
              <p>
                i&apos;m avyukt. when i was a kid i used to change games with tools
                that weren&apos;t really meant for me—just to see if i could make
                the world behave the way i imagined. that turned out to be a habit:
                take something apart, learn the rules, then decide which rules are
                worth keeping.
              </p>

              <p>
                college gave that habit a name. most days it&apos;s not
                glamorous—it&apos;s debugging, rewriting, being wrong in public,
                and learning from people who are sharper than me. i&apos;m not
                trying to sound impressive on this page; i&apos;m trying to sound
                accurate.
              </p>

              <p>
                the work itself—what i&apos;ve built, where, with who—is listed
                elsewhere so this doesn&apos;t turn into a brochure.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs text-foreground/75 transition-colors hover:opacity-80"
              >
                read my full story →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
