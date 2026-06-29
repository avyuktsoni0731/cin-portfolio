'use client'

import Link from 'next/link'
import { JournalSpineMark, SectionOrnament } from '@/components/visual/DecorIcons'
import { getFeaturedPost, formatPostDate } from '@/lib/posts'

const THOUGHTS = [
  {
    date: 'march 2026',
    entry:
      'most of what i ship lately sits between bare metal and a UI — neurosense reminded me how much story lives in a clean FFT and a calm false-positive rate.',
  },
  {
    date: 'february 2026',
    entry:
      'continuum started as “stop tab-hopping between jira and calendar”; teaching slack to hold context turned into the real product.',
  },
  {
    date: 'early 2026',
    entry:
      'leading at gdgc felt less like “owning code” and more like unblocking thirteen people so their projects could ship — still learning that balance.',
  },
]

const featured = getFeaturedPost()

export default function ThoughtsSection() {
  return (
    <section
      id="writing"
      className="relative w-full overflow-hidden bg-background/80 px-6 py-28 backdrop-blur-[3px]"
    >
      <div className="mx-auto max-w-3xl">
        <SectionOrnament className="mb-10" />

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
          <div className="hidden shrink-0 opacity-40 md:block">
            <JournalSpineMark className="h-32 w-10 text-muted-foreground/50" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="fade-in-up mb-10 flex flex-wrap items-end justify-between gap-4">
              <h3 className="text-xl font-serif font-semibold tracking-tight">
                current thoughts
              </h3>
              <Link
                href="/writing"
                className="font-mono text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              >
                all writing →
              </Link>
            </div>

            {featured ? (
              <Link
                href={`/writing/${featured.slug}`}
                className="group fade-in-up mb-10 block rounded-sm border border-border/25 bg-muted/[0.04] p-5 transition-colors hover:border-border/40 hover:bg-muted/10"
              >
                <p className="mb-2 font-mono text-xs text-muted-foreground">
                  latest · {formatPostDate(featured.publishedAt)}
                </p>
                <p className="mb-2 font-serif text-lg font-semibold group-hover:underline">
                  {featured.title}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {featured.subtitle}
                </p>
              </Link>
            ) : null}

            <div className="space-y-6">
              {THOUGHTS.map((thought, idx) => (
                <div
                  key={idx}
                  className="fade-in-up border-l border-border/35 py-2 pl-6"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <p className="mb-2 font-mono text-xs text-foreground/75">
                    {thought.date}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/75">
                    {thought.entry}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
