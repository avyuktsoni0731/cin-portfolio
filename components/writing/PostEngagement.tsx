'use client'

import { useCallback, useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  getStoredAuthorName,
  getVisitorId,
  setStoredAuthorName,
} from '@/lib/visitor-id'
import type { CommentNode } from '@/lib/writing-engagement/types'

function formatCommentDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function CommentForm({
  postSlug,
  parentId,
  parentLabel,
  onCancel,
  onSuccess,
}: {
  postSlug: string
  parentId?: string
  parentLabel?: string
  onCancel?: () => void
  onSuccess: () => void
}) {
  const [authorName, setAuthorName] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setAuthorName(getStoredAuthorName())
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`/api/writing/${postSlug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName,
          body,
          parentId: parentId ?? null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to post comment')

      setStoredAuthorName(authorName.trim())
      setBody('')
      onSuccess()
      onCancel?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {parentLabel ? (
        <p className="font-mono text-[11px] text-muted-foreground">
          replying to {parentLabel}
        </p>
      ) : null}
      <input
        type="text"
        required
        maxLength={64}
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="your name"
        className="w-full rounded-sm border border-border/35 bg-background/60 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-border"
      />
      <textarea
        required
        maxLength={2000}
        rows={parentId ? 3 : 4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={parentId ? 'write a reply…' : 'leave a comment…'}
        className="w-full resize-y rounded-sm border border-border/35 bg-background/60 px-3 py-2 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-border"
      />
      {error ? (
        <p className="font-mono text-[11px] text-red-400/90">{error}</p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-sm border border-border/40 bg-muted/20 px-4 py-2 font-mono text-xs text-foreground transition-colors hover:bg-muted/35 disabled:opacity-50"
        >
          {submitting ? 'posting…' : parentId ? 'post reply' : 'post comment'}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-sm px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}

function CommentThread({
  postSlug,
  comment,
  depth = 0,
  onRefresh,
}: {
  postSlug: string
  comment: CommentNode
  depth?: number
  onRefresh: () => void
}) {
  const [replyOpen, setReplyOpen] = useState(false)

  return (
    <div
      className={cn(
        depth > 0 && 'ml-4 border-l border-border/30 pl-4 sm:ml-6 sm:pl-5',
      )}
    >
      <article className="py-4">
        <header className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-sm font-medium text-foreground">
            {comment.authorName}
          </span>
          <time
            dateTime={comment.createdAt}
            className="font-mono text-[11px] text-muted-foreground"
          >
            {formatCommentDate(comment.createdAt)}
          </time>
        </header>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
          {comment.body}
        </p>
        <button
          type="button"
          onClick={() => setReplyOpen((v) => !v)}
          className="mt-3 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          {replyOpen ? 'cancel reply' : 'reply'}
        </button>
        {replyOpen ? (
          <div className="mt-3">
            <CommentForm
              postSlug={postSlug}
              parentId={comment.id}
              parentLabel={comment.authorName}
              onCancel={() => setReplyOpen(false)}
              onSuccess={onRefresh}
            />
          </div>
        ) : null}
      </article>
      {comment.replies.length > 0 ? (
        <div className="space-y-0">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              postSlug={postSlug}
              comment={reply}
              depth={depth + 1}
              onRefresh={onRefresh}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function PostEngagement({ postSlug }: { postSlug: string }) {
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
  const [comments, setComments] = useState<CommentNode[]>([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [commentsError, setCommentsError] = useState<string | null>(null)

  const loadLikes = useCallback(async () => {
    const visitorId = getVisitorId()
    const qs = visitorId ? `?visitorId=${encodeURIComponent(visitorId)}` : ''
    const res = await fetch(`/api/writing/${postSlug}/likes${qs}`)
    if (!res.ok) return
    const data = await res.json()
    setLikeCount(data.count ?? 0)
    setLiked(Boolean(data.liked))
  }, [postSlug])

  const loadComments = useCallback(async () => {
    setCommentsLoading(true)
    setCommentsError(null)
    try {
      const res = await fetch(`/api/writing/${postSlug}/comments`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to load comments')
      setComments(data.comments ?? [])
    } catch (err) {
      setCommentsError(
        err instanceof Error ? err.message : 'Failed to load comments',
      )
    } finally {
      setCommentsLoading(false)
    }
  }, [postSlug])

  useEffect(() => {
    loadLikes()
    loadComments()
  }, [loadLikes, loadComments])

  async function handleLike() {
    setLikeLoading(true)
    try {
      const res = await fetch(`/api/writing/${postSlug}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: getVisitorId() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to update like')
      setLikeCount(data.count ?? 0)
      setLiked(Boolean(data.liked))
    } catch {
      /* silent — likes are non-critical */
    } finally {
      setLikeLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-[42rem] space-y-10 border-t border-border/20 pt-10">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleLike}
          disabled={likeLoading}
          aria-pressed={liked}
          aria-label={liked ? 'Unlike this post' : 'Like this post'}
          className={cn(
            'inline-flex items-center gap-2 rounded-sm border px-4 py-2 font-mono text-xs transition-colors disabled:opacity-50',
            liked
              ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300'
              : 'border-border/35 bg-background/50 text-muted-foreground hover:border-border hover:text-foreground',
          )}
        >
          <Heart
            className={cn('h-3.5 w-3.5', liked && 'fill-current')}
            strokeWidth={1.75}
          />
          <span>{likeCount}</span>
        </button>
        <p className="font-mono text-[11px] text-muted-foreground">
          anonymous · one per browser
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-1 font-serif text-xl font-semibold tracking-tight text-foreground">
            comments
          </h2>
          <p className="font-mono text-[11px] text-muted-foreground">
            name required · threaded replies
          </p>
        </div>

        <CommentForm postSlug={postSlug} onSuccess={loadComments} />

        {commentsLoading ? (
          <p className="font-mono text-xs text-muted-foreground">
            loading comments…
          </p>
        ) : commentsError ? (
          <p className="font-mono text-xs text-red-400/90">{commentsError}</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            no comments yet — start the thread.
          </p>
        ) : (
          <div className="divide-y divide-border/20">
            {comments.map((comment) => (
              <CommentThread
                key={comment.id}
                postSlug={postSlug}
                comment={comment}
                onRefresh={loadComments}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
