'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import {
  sliceLatestWeeks,
  type ContributionDayCell,
} from '@/lib/github-contributions'

/** Tailwind w-3 + gap-1 — keep in sync with classNames below */
const CELL_PX = 12
const GAP_PX = 4

const intensityColors = [
  'bg-[#161b22] ring-1 ring-inset ring-zinc-700/60',
  'bg-emerald-950/95 border border-emerald-800/70',
  'bg-emerald-600 shadow-[0_0_6px_rgba(5,150,105,0.35)]',
  'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]',
] as const

function weekColumnsFromWidth(widthPx: number, maxWeeks: number): number {
  const unit = CELL_PX + GAP_PX
  const n = Math.floor((widthPx + GAP_PX) / unit)
  return Math.max(8, Math.min(maxWeeks, n))
}

export function ActivityHeatmap({ weeks }: { weeks: ContributionDayCell[][] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const maxWeeks = weeks.length
  const [colCount, setColCount] = useState(() =>
    Math.min(maxWeeks, Math.max(8, 26))
  )

  const measure = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    const w = el.getBoundingClientRect().width
    if (w < 2) return
    setColCount(weekColumnsFromWidth(w, maxWeeks))
  }, [maxWeeks])

  useLayoutEffect(() => {
    measure()
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(() => measure())
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  const visible = sliceLatestWeeks(
    weeks,
    Math.min(maxWeeks, colCount)
  )

  return (
    <div ref={wrapRef} className="w-full min-w-0 overflow-hidden">
      <div className="flex w-full min-w-0 justify-start gap-1">
        {visible.map((week, weekIdx) => (
          <div
            key={weekIdx}
            className="flex min-h-0 min-w-0 flex-1 flex-col gap-1"
          >
            {week.map((day) => (
              <div
                key={day.date}
                className={`aspect-square w-full min-h-0 min-w-0 rounded-sm transition-all hover:z-10 hover:ring-2 hover:ring-emerald-400/40 ${intensityColors[day.level]}`}
                title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Same layout rules as real heatmap — placeholder when env is missing */
export function ActivityHeatmapPlaceholder() {
  const weeks: number[][] = Array.from({ length: 52 }, (_, weekIdx) =>
    Array.from({ length: 7 }, (_, dayIdx) => {
      const n = (weekIdx * 31 + dayIdx * 17 + weekIdx * dayIdx) % 97
      return n % 4
    })
  )

  const wrapRef = useRef<HTMLDivElement>(null)
  const [colCount, setColCount] = useState(26)

  const measure = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    const w = el.getBoundingClientRect().width
    if (w < 2) return
    setColCount(weekColumnsFromWidth(w, 52))
  }, [])

  useLayoutEffect(() => {
    measure()
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(() => measure())
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  const sliceStart = Math.max(0, weeks.length - colCount)
  const visible = weeks.slice(sliceStart)

  return (
    <div ref={wrapRef} className="w-full min-w-0 overflow-hidden">
      <div className="flex w-full min-w-0 justify-start gap-1">
        {visible.map((week, weekIdx) => (
          <div
            key={weekIdx}
            className="flex min-h-0 min-w-0 flex-1 flex-col gap-1"
          >
            {week.map((intensity, dayIdx) => (
              <div
                key={dayIdx}
                className={`aspect-square w-full min-h-0 min-w-0 rounded-sm ${intensityColors[intensity]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
