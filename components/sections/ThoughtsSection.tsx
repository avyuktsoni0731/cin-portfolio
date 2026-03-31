'use client'

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
      className="relative w-full py-24 px-6 bg-background"
    >
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-serif font-semibold mb-12 tracking-tight fade-in-up">
          current thoughts
        </h3>

        <div className="space-y-6">
          {THOUGHTS.map((thought, idx) => (
            <div
              key={idx}
              className="fade-in-up border-l border-border/30 pl-6 py-2"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <p className="font-mono text-xs text-foreground/50 mb-2">
                {thought.date}
              </p>
              <p className="text-sm text-foreground/80">{thought.entry}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center fade-in-up">
          <p className="text-xs text-foreground/50">
            more thoughts coming soon...
          </p>
        </div>
      </div>
    </section>
  )
}
