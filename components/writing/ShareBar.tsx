'use client'

import { useCallback, useState } from 'react'
import type { Post } from '@/lib/posts'

export function ShareBar({ post, url }: { post: Post; url: string }) {
  const [copied, setCopied] = useState(false)

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [url])

  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  return (
    <div className="flex flex-wrap items-center gap-3 border-y border-border/20 py-5">
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
        share
      </span>
      <button
        type="button"
        onClick={copyLink}
        className="rounded-sm border border-border/30 bg-background/50 px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
      >
        {copied ? 'copied' : 'copy link'}
      </button>
      <a
        href={tweet}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm border border-border/30 bg-background/50 px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
      >
        x / twitter
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm border border-border/30 bg-background/50 px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
      >
        linkedin
      </a>
    </div>
  )
}
