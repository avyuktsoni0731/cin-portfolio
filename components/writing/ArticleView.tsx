import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { formatPostDate } from '@/lib/posts'
import { SectionOrnament } from '@/components/visual/DecorIcons'
import { PostBody } from '@/components/writing/PostBody'
import { PostEngagement } from '@/components/writing/PostEngagement'
import { ShareBar } from '@/components/writing/ShareBar'

export function ArticleView({ post, url }: { post: Post; url: string }) {
  return (
    <article className="relative min-h-screen overflow-hidden bg-background/80 backdrop-blur-[2px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] opacity-[0.2]"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(80,60,120,0.22), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(40,80,100,0.12), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 pb-28 pt-28 md:pt-32">
        <p className="fade-in-up mb-8 font-mono text-xs text-muted-foreground">
          <Link href="/writing" className="transition-colors hover:text-foreground">
            ← writing
          </Link>
        </p>

        <header className="fade-in-up mb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {formatPostDate(post.publishedAt)}
            </time>
            <span className="text-muted-foreground/40">·</span>
            <span>{post.readingTimeMinutes} min read</span>
            {post.updatedAt ? (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span>updated {formatPostDate(post.updatedAt)}</span>
              </>
            ) : null}
          </div>

          <h1 className="max-w-[18ch] font-serif text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl md:leading-[1.06]">
            {post.title}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {post.subtitle}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="h-9 w-9 overflow-hidden rounded-full border border-border/30 bg-muted/20">
              <Image
                src="https://github.com/avyuktsoni0731.png"
                alt="Avyukt Soni"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-foreground">Avyukt Soni</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                builder · engineer
              </p>
            </div>
          </div>
        </header>

        {post.coverImage ? (
          <figure className="fade-in-up mb-12 -mx-2 overflow-hidden rounded-sm border border-border/35 sm:-mx-0">
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              width={1200}
              height={630}
              className="h-auto max-h-[420px] w-full object-cover"
              priority
            />
          </figure>
        ) : null}

        <SectionOrnament className="mb-12" />

        <ShareBar post={post} url={url} />

        <div className="py-10">
          <PostBody blocks={post.blocks} />
        </div>

        <PostEngagement postSlug={post.slug} />

        <footer className="mt-8 space-y-8 border-t border-border/20 pt-10">
          {post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-border/25 bg-background/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <ShareBar post={post} url={url} />

          <p className="text-sm text-muted-foreground">
            <Link
              href="/writing"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              ← all writing
            </Link>
          </p>
        </footer>
      </div>
    </article>
  )
}
