'use client'

const THOUGHTS = [
  {
    date: 'march 14th, 2026, 1:08pm pst',
    entry: 'day 542 of chin-ups and pull-ups',
  },
  {
    date: 'march 12th, 2026, 10:06pm pst',
    entry: 'day 541 of chin-ups and pull-ups',
  },
  {
    date: 'march 11th, 2026, 9:57pm pst',
    entry: 'day 540 of chin-ups and pull-ups',
  },
  {
    date: 'march 10th, 2026, 3:45pm pst',
    entry: 'finished v1 of the new dashboard. feels right.',
  },
  {
    date: 'march 8th, 2026, 11:22pm pst',
    entry: 'thinking about what&apos;s next. always thinking.',
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
              <p className="text-sm text-foreground/80">
                {thought.entry}
              </p>
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
