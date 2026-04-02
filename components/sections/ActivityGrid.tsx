import Link from 'next/link'
import { getGithubContributionCalendar } from '@/lib/github-contributions'
import {
  ActivityHeatmap,
  ActivityHeatmapPlaceholder,
} from '@/components/sections/ActivityHeatmap'
import { SectionOrnament } from '@/components/visual/DecorIcons'

/** GitHub-like greens — match ActivityHeatmap legend */
const intensityColors = [
  'bg-muted/80 ring-1 ring-inset ring-border/50',
  'bg-emerald-950/95 border border-emerald-800/70',
  'bg-emerald-600 shadow-[0_0_6px_rgba(5,150,105,0.35)]',
  'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]',
] as const

function Legend() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-start gap-4 text-xs text-muted-foreground">
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

export default async function ActivityGrid() {
  const data = await getGithubContributionCalendar()

  return (
    <section className="relative w-full bg-background/88 px-6 py-20 backdrop-blur-[2px]">
      <div className="mx-auto w-full max-w-3xl">
        <SectionOrnament className="mb-8" />
        <h3 className="mb-3 text-xl font-serif font-semibold tracking-tight fade-in-up">
          activity
        </h3>
        {!data ? (
          <p className="mb-8 max-w-lg text-xs leading-relaxed text-muted-foreground">
            Add{' '}
            <code className="font-mono text-foreground/90">GITHUB_USERNAME</code> and{' '}
            <code className="font-mono text-foreground/90">GITHUB_TOKEN</code> to{' '}
            <code className="font-mono text-foreground/90">.env.local</code> (classic PAT
            with <code className="font-mono text-foreground/90">read:user</code>). Totals
            use the{' '}
            <strong className="font-normal text-foreground/95">last ~365 days</strong>{' '}
            (like GitHub); the grid shows the latest weeks that fit this width. Set{' '}
            <code className="font-mono text-foreground/90">GITHUB_ACTIVITY_YEAR=2026</code>{' '}
            to lock the range to that calendar year.
          </p>
        ) : (
          <p className="mb-8 text-xs text-muted-foreground">
            <span className="text-foreground/90">{data.totalContributions}</span>{' '}
            contributions
            {data.periodMode === 'rolling' ? (
              <> over the {data.periodLabel}</>
            ) : (
              <> in {data.periodLabel}</>
            )}
            . {' '}
            <Link
              href={`https://github.com/${data.login}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              @{data.login}
            </Link>
          </p>
        )}

        <div className="noise-panel fade-in-up relative w-full rounded-md border border-border/25 bg-muted/10 p-5 sm:p-6">
          {data?.weeks?.length ? (
            <ActivityHeatmap weeks={data.weeks} />
          ) : (
            <ActivityHeatmapPlaceholder />
          )}
          <Legend />
        </div>
      </div>
    </section>
  )
}
