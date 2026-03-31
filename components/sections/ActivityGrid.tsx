import Link from 'next/link'
import {
  getGithubContributionCalendar,
  type ContributionDayCell,
} from '@/lib/github-contributions'

const intensityColors = [
  'bg-muted/20',
  'bg-muted/40',
  'bg-muted/60',
  'bg-muted/80',
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
                className={`w-3 h-3 rounded-sm border border-border/20 ${intensityColors[intensity]}`}
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
          <div
            key={idx}
            className={`w-2 h-2 rounded-sm border border-border/20 ${color}`}
          />
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
                className={`w-3 h-3 rounded-sm border border-border/20 transition-all hover:ring-1 hover:ring-foreground/30 ${intensityColors[day.level]}`}
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
            <code className="font-mono text-foreground/65">.env.local</code> (classic
            PAT with <code className="font-mono text-foreground/65">read:user</code>) to
            load your real GitHub contribution calendar for{' '}
            {new Date().getFullYear()}.
          </p>
        ) : (
          <p className="text-xs text-foreground/45 mb-8">
            <span className="text-foreground/70">{data.totalContributions}</span>{' '}
            contributions in {data.year} ·{' '}
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
