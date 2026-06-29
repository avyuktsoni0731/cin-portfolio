'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  getStoredAuthorName,
  getVisitorId,
  setStoredAuthorName,
} from '@/lib/visitor-id'
import type { CommentNode } from '@/lib/writing-engagement/types'

const COMMENTS_SECTION_ID = 'post-comments'

type EngagementContextValue = {
  postSlug: string
  likeCount: number
  liked: boolean
  likeLoading: boolean
  commentCount: number
  handleLike: () => void
  scrollToComments: () => void
  loadComments: () => Promise<void>
}

const EngagementContext = createContext<EngagementContextValue | null>(null)

function useEngagement() {
  const ctx = useContext(EngagementContext)
  if (!ctx) {
    throw new Error('PostEngagement components must be used within PostEngagementProvider')
  }
  return ctx
}

function countComments(nodes: CommentNode[]): number {
  return nodes.reduce(
    (sum, node) => sum + 1 + countComments(node.replies),
    0,
  )
}

function formatCommentDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function PostEngagementProvider({
  postSlug,
  children,
}: {
  postSlug: string
  children: ReactNode
}) {
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
  const [commentCount, setCommentCount] = useState(0)

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
    try {
      const res = await fetch(`/api/writing/${postSlug}/comments`)
      const data = await res.json()
      if (!res.ok) return
      setCommentCount(countComments(data.comments ?? []))
    } catch {
      /* non-critical */
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
      /* silent */
    } finally {
      setLikeLoading(false)
    }
  }

  function scrollToComments() {
    document.getElementById(COMMENTS_SECTION_ID)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <EngagementContext.Provider
      value={{
        postSlug,
        likeCount,
        liked,
        likeLoading,
        commentCount,
        handleLike,
        scrollToComments,
        loadComments,
      }}
    >
      {children}
    </EngagementContext.Provider>
  )
}

function EngagementActionButton({
  onClick,
  disabled,
  pressed,
  label,
  children,
  className,
}: {
  onClick: () => void
  disabled?: boolean
  pressed?: boolean
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed}
      aria-label={label}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  )
}

/** Medium-style compact bar — place below the article heading */
export function PostEngagementBar({ className }: { className?: string }) {
  const {
    likeCount,
    liked,
    likeLoading,
    commentCount,
    handleLike,
    scrollToComments,
  } = useEngagement()

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3 border-b border-border/20 pb-6',
        className,
      )}
    >
      <EngagementActionButton
        onClick={handleLike}
        disabled={likeLoading}
        pressed={liked}
        label={liked ? 'Unlike this post' : 'Like this post'}
        className={
          liked
            ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300'
            : 'border-border/35 bg-background/40 text-muted-foreground hover:border-border hover:text-foreground'
        }
      >
        <Heart
          className={cn('h-4 w-4', liked && 'fill-current')}
          strokeWidth={1.75}
        />
        <span>{likeCount}</span>
      </EngagementActionButton>

      <EngagementActionButton
        onClick={scrollToComments}
        label="Scroll to comments"
        className="border-border/35 bg-background/40 text-muted-foreground hover:border-border hover:text-foreground"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
        <span>{commentCount}</span>
      </EngagementActionButton>
    </div>
  )
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

/** Full comments section at the bottom of the article */
export function PostEngagementComments() {
  const { postSlug, loadComments: refreshCommentCount } = useEngagement()
  const [comments, setComments] = useState<CommentNode[]>([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [commentsError, setCommentsError] = useState<string | null>(null)

  const loadComments = useCallback(async () => {
    setCommentsLoading(true)
    setCommentsError(null)
    try {
      const res = await fetch(`/api/writing/${postSlug}/comments`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to load comments')
      setComments(data.comments ?? [])
      await refreshCommentCount()
    } catch (err) {
      setCommentsError(
        err instanceof Error ? err.message : 'Failed to load comments',
      )
    } finally {
      setCommentsLoading(false)
    }
  }, [postSlug, refreshCommentCount])

  useEffect(() => {
    loadComments()
  }, [loadComments])

  return (
    <section
      id={COMMENTS_SECTION_ID}
      className="mx-auto max-w-[42rem] scroll-mt-28 space-y-6 border-t border-border/20 pt-10"
    >
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
    </section>
  )
}

/** @deprecated use PostEngagementProvider + Bar + Comments */
export function PostEngagement({ postSlug }: { postSlug: string }) {
  return (
    <PostEngagementProvider postSlug={postSlug}>
      <PostEngagementBar className="mb-6" />
      <PostEngagementComments />
    </PostEngagementProvider>
  )
}
