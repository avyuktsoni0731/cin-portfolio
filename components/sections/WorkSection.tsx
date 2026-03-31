'use client'

import Link from 'next/link'
import { WorkItemsList } from '@/components/WorkItemsList'
import { ALL_WORK_ITEMS, HOME_WORK_ITEMS, HOME_WORK_COUNT } from '@/lib/work-items'

export default function WorkSection() {
  const moreCount = ALL_WORK_ITEMS.length - HOME_WORK_COUNT

  return (
    <section
      id="work"
      className="relative w-full py-24 px-6 bg-background"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif font-semibold mb-16 tracking-tight fade-in-up">
          work
        </h2>

        <WorkItemsList items={HOME_WORK_ITEMS} />

        {moreCount > 0 ? (
          <div className="mt-14 fade-in-up border-t border-border/20 pt-10">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-sm text-foreground/55 transition-colors hover:text-foreground"
            >
              <span>
                +{moreCount} more project{moreCount === 1 ? '' : 's'} on the full list
              </span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
