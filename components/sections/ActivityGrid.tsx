'use client'

/** Deterministic “activity” so SSR and hydration match (no Math.random in render). */
function intensityAt(weekIdx: number, dayIdx: number): number {
  const n = (weekIdx * 31 + dayIdx * 17 + weekIdx * dayIdx) % 97
  return n % 4
}

export default function ActivityGrid() {
  const weeks = Array.from({ length: 12 }, (_, weekIdx) =>
    Array.from({ length: 7 }, (_, dayIdx) => intensityAt(weekIdx, dayIdx))
  )

  const intensityColors = [
    'bg-muted/20',
    'bg-muted/40',
    'bg-muted/60',
    'bg-muted/80',
  ]

  return (
    <section className="relative w-full py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-serif font-semibold mb-8 tracking-tight fade-in-up">
          activity
        </h3>

        <div className="fade-in-up bg-muted/5 border border-border/20 rounded-sm p-6">
          <div className="overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {weeks.map((week, weekIdx) => (
                <div
                  key={weekIdx}
                  className="flex flex-col gap-1"
                >
                  {week.map((intensity, dayIdx) => (
                    <div
                      key={dayIdx}
                      className={`w-3 h-3 rounded-sm border border-border/20 transition-all hover:ring-1 hover:ring-foreground/30 ${
                        intensityColors[intensity]
                      }`}
                      title={`Week ${weekIdx + 1}, Day ${dayIdx + 1}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-xs text-foreground/50 flex gap-4 items-center">
            <span>less</span>
            <div className="flex gap-1">
              {intensityColors.map((color, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-sm border border-border/20 ${color}`}
                />
              ))}
            </div>
            <span>more</span>
          </div>
        </div>
      </div>
    </section>
  )
}
