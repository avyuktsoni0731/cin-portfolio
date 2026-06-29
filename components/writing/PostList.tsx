'use client'

import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { formatPostDate } from '@/lib/posts'

export function PostList({ posts }: { posts: Post[] }) {
  const featured = posts.find((p) => p.featured)
  const rest = posts.filter((p) => p.slug !== featured?.slug)

  return (
    <div className="space-y-16">
      {featured ? (
        <Link
          href={`/writing/${featured.slug}`}
          className="group fade-in-up block rounded-md border border-border/25 bg-muted/[0.04] p-6 transition-colors hover:border-border/45 hover:bg-muted/10 md:p-8"
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            featured · {formatPostDate(featured.publishedAt)}
          </p>
          <h2 className="mb-3 font-serif text-2xl font-semibold tracking-tight transition-colors group-hover:text-foreground md:text-3xl">
            {featured.title}
          </h2>
          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {featured.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] text-muted-foreground">
              {featured.readingTimeMinutes} min read
            </span>
            {featured.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-border/25 bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/90"
              >
                {tag}
              </span>
            ))}
            <span className="ml-auto font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              read →
            </span>
          </div>
        </Link>
      ) : null}

      {rest.length > 0 ? (
        <div className="space-y-10">
          {rest.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group fade-in-up block border-l border-border/35 py-1 pl-6 transition-colors hover:border-border/60"
              style={{ animationDelay: `${(idx + 1) * 80}ms` }}
            >
              <p className="mb-2 font-mono text-xs text-muted-foreground">
                {formatPostDate(post.publishedAt)} · {post.readingTimeMinutes}{' '}
                min
              </p>
              <h3 className="mb-2 font-serif text-lg font-semibold tracking-tight group-hover:underline md:text-xl">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {post.subtitle}
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
