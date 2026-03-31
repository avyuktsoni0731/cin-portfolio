import Link from 'next/link'
import {
  getGithubContributionCalendar,
  type ContributionDayCell,
} from '@/lib/github-contributions'

/** GitHub-like greens — readable on near-black backgrounds */
const intensityColors = [
  'bg-[#161b22] ring-1 ring-inset ring-zinc-700/60',
  'bg-emerald-950/95 border border-emerald-800/70',
  'bg-emerald-600 shadow-[0_0_6px_rgba(5,150,105,0.35)]',
  'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]',
] as const

function PlaceholderGrid() {
  const weeks = Array.from({ length: 12 }, (_, weekIdx) =>
    Array.from({ length: 7 }, (_, dayIdx) => {
      const n = (weekIdx * 31 + dayIdx * 17 + weekIdx * dayIdx) % 97
      return n % 4
    })
  )

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-1 min-w-max mx-auto">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-1">
            {week.map((intensity, dayIdx) => (
              <div
                key={dayIdx}
                className={`w-3 h-3 rounded-sm ${intensityColors[intensity]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Legend() {
  return (
    <div className="mt-6 text-xs text-foreground/50 flex gap-4 items-center flex-wrap">
      <span>less</span>
      <div className="flex gap-1">
        {intensityColors.map((color, idx) => (
          <div key={idx} className={`w-2 h-2 rounded-sm ${color}`} />
        ))}
      </div>
      <span>more</span>
    </div>
  )
}

function RealGrid({ weeks }: { weeks: ContributionDayCell[][] }) {
  return (
    <div className="overflow-x-auto w-full">
      <div className="flex gap-1 min-w-max">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.date}
                className={`w-3 h-3 rounded-sm transition-all hover:ring-2 hover:ring-emerald-400/40 hover:z-10 ${intensityColors[day.level]}`}
                title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function ActivityGrid() {
  const data = await getGithubContributionCalendar()

  return (
    <section className="relative w-full py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl font-serif font-semibold mb-2 tracking-tight fade-in-up">
          activity
        </h3>
        {!data ? (
          <p className="text-xs text-foreground/45 mb-8 max-w-lg leading-relaxed">
            Add{' '}
            <code className="font-mono text-foreground/65">GITHUB_USERNAME</code> and{' '}
            <code className="font-mono text-foreground/65">GITHUB_TOKEN</code> to{' '}
            <code className="font-mono text-foreground/65">.env.local</code> (classic PAT
            with <code className="font-mono text-foreground/65">read:user</code>). By
            default the graph shows the{' '}
            <strong className="text-foreground/75 font-normal">last ~365 days</strong>{' '}
            (like GitHub). Set{' '}
            <code className="font-mono text-foreground/65">GITHUB_ACTIVITY_YEAR=2026</code>{' '}
            to lock the range to that calendar year.
          </p>
        ) : (
          <p className="text-xs text-foreground/45 mb-8">
            <span className="text-foreground/80">{data.totalContributions}</span>{' '}
            contributions
            {data.periodMode === 'rolling' ? (
              <> over the {data.periodLabel}</>
            ) : (
              <> in {data.periodLabel}</>
            )}{' '}
            ·{' '}
            <Link
              href={`https://github.com/${data.login}`}
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              @{data.login}
            </Link>
          </p>
        )}

        <div className="fade-in-up bg-muted/5 border border-border/20 rounded-sm p-6">
          {data ? <RealGrid weeks={data.weeks} /> : <PlaceholderGrid />}
          <Legend />
        </div>
      </div>
    </section>
  )
}
