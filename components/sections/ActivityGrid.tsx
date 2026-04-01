import Link from 'next/link'
import { getGithubContributionCalendar } from '@/lib/github-contributions'
import {
  ActivityHeatmap,
  ActivityHeatmapPlaceholder,
} from '@/components/sections/ActivityHeatmap'
import { SectionOrnament } from '@/components/visual/DecorIcons'

/** GitHub-like greens — match ActivityHeatmap legend */
const intensityColors = [
  'bg-[#161b22] ring-1 ring-inset ring-zinc-700/60',
  'bg-emerald-950/95 border border-emerald-800/70',
  'bg-emerald-600 shadow-[0_0_6px_rgba(5,150,105,0.35)]',
  'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]',
] as const

function Legend() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-start gap-4 text-xs text-foreground/50">
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
          <p className="text-xs text-foreground/45 mb-8 max-w-lg leading-relaxed">
            Add{' '}
            <code className="font-mono text-foreground/65">GITHUB_USERNAME</code> and{' '}
            <code className="font-mono text-foreground/65">GITHUB_TOKEN</code> to{' '}
            <code className="font-mono text-foreground/65">.env.local</code> (classic PAT
            with <code className="font-mono text-foreground/65">read:user</code>). Totals
            use the{' '}
            <strong className="text-foreground/75 font-normal">last ~365 days</strong>{' '}
            (like GitHub); the grid shows the latest weeks that fit this width. Set{' '}
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
            )}
            . graph scales to fit width ·{' '}
            <Link
              href={`https://github.com/${data.login}`}
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              @{data.login}
            </Link>
          </p>
        )}

        <div className="noise-panel fade-in-up relative w-full rounded-sm border border-border/20 bg-muted/5 p-5 sm:p-6">
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
