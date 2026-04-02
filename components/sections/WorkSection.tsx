'use client'

import Link from 'next/link'
import { WorkItemsList } from '@/components/WorkItemsList'
import {
  ALL_WORK_ITEMS,
  HOME_WORK_ITEMS,
  HOME_WORK_COUNT,
} from '@/lib/work-items'
import { NoisePanel } from '@/components/visual/NoisePanel'
import { SectionOrnament, StackLayersMark } from '@/components/visual/DecorIcons'

export default function WorkSection() {
  const moreCount = ALL_WORK_ITEMS.length - HOME_WORK_COUNT

  return (
    <section
      id="work"
      className="relative w-full overflow-hidden bg-background/80 py-28 px-6 backdrop-blur-[3px]"
    >
      <div className="relative mx-auto max-w-3xl">
        <SectionOrnament className="mb-12" />

        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="fade-in-up font-serif text-4xl font-semibold tracking-tight">
            work
          </h2>
          <NoisePanel className="px-4 py-3 sm:max-w-[200px]">
            <StackLayersMark className="h-10 w-full text-muted-foreground/50" />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/75">
              stacks & experiments
            </p>
          </NoisePanel>
        </div>

        <WorkItemsList items={HOME_WORK_ITEMS} />

        {moreCount > 0 ? (
          <div className="fade-in-up mt-14 border-t border-border/20 pt-10">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-sm text-foreground/75 transition-colors hover:opacity-80"
            >
              <span>
                +{moreCount} more project{moreCount === 1 ? '' : 's'} on the full
                list
              </span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
