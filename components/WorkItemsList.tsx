'use client'

import type { WorkItem } from '@/lib/work-items'

export function WorkItemsList({ items }: { items: WorkItem[] }) {
  return (
    <div className="space-y-12">
      {items.map((item, idx) => {
        const external =
          item.link.startsWith('http') && item.link !== '#'
        return (
          <a
            key={`${item.title}-${idx}`}
            href={item.link}
            className="group fade-in-up block hover:opacity-75 transition-opacity"
            style={{ animationDelay: `${idx * 100}ms` }}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            <h3
              className={`text-lg font-serif font-semibold group-hover:underline ${item.role ? 'mb-1' : 'mb-2'}`}
            >
              {item.title}
            </h3>
            {item.role ? (
              <p className="mb-2 text-[13px] leading-snug text-foreground/45">
                {item.role}
              </p>
            ) : null}
            <p className="text-sm leading-relaxed text-foreground/70">
              {item.description}
            </p>
          </a>
        )
      })}
    </div>
  )
}
