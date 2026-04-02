'use client'

import { JournalSpineMark, SectionOrnament } from '@/components/visual/DecorIcons'

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
  {
    date: 'winter 2025',
    entry:
      'voltsense’s lesson: anomaly detection is easy to demo, hard to make trustworthy in a real home — cloud run and gemini were the smallest part.',
  },
  {
    date: 'fall 2025',
    entry:
      'if the resume is honest, it should sound boring next to the repo. checking that again this quarter.',
  },
]

export default function ThoughtsSection() {
  return (
    <section
      id="writing"
      className="relative w-full overflow-hidden bg-background/80 py-28 px-6 backdrop-blur-[3px]"
    >
      <div className="mx-auto max-w-3xl">
        <SectionOrnament className="mb-10" />

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
          <div className="hidden shrink-0 opacity-40 md:block">
            <JournalSpineMark className="h-32 w-10 text-muted-foreground/50" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-10 text-xl font-serif font-semibold tracking-tight fade-in-up">
              current thoughts
            </h3>

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

            <div className="mt-12 text-center fade-in-up">
              <p className="text-xs text-muted-foreground/80">
                more thoughts coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
