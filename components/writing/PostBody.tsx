import Image from 'next/image'
import type { PostBlock } from '@/lib/posts'
import { RichText } from '@/lib/rich-text'
import { cn } from '@/lib/utils'

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="article-body mx-auto max-w-[42rem] space-y-8">
      {blocks.map((block, idx) => (
        <Block key={idx} block={block} />
      ))}
    </div>
  )
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-base leading-[1.8] text-foreground/80 md:text-[1.0625rem]">
          <RichText>{block.content}</RichText>
        </p>
      )

    case 'heading':
      if (block.level === 2) {
        return (
          <h2 className="pt-4 font-serif text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]">
            {block.content}
          </h2>
        )
      }
      return (
        <h3 className="pt-2 font-serif text-xl font-semibold tracking-tight text-foreground">
          {block.content}
        </h3>
      )

    case 'image':
      return (
        <figure
          className={cn(
            'my-10',
            block.wide && '-mx-2 sm:-mx-6 md:-mx-10',
          )}
        >
          <div className="overflow-hidden rounded-sm border border-border/35 bg-muted/10 ring-1 ring-inset ring-white/5">
            <Image
              src={block.src}
              alt={block.alt}
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
            />
          </div>
          {block.caption ? (
            <figcaption className="mt-3 text-center font-mono text-[11px] leading-relaxed text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      )

    case 'quote':
      return (
        <figure className="my-12 border-y border-border/25 py-10">
          <blockquote className="font-serif text-xl italic leading-snug text-foreground md:text-2xl">
            &ldquo;<RichText>{block.content}</RichText>&rdquo;
          </blockquote>
          {block.attribution ? (
            <figcaption className="mt-4 font-mono text-xs text-muted-foreground">
              — {block.attribution}
            </figcaption>
          ) : null}
        </figure>
      )

    case 'code':
      return (
        <figure className="my-10">
          <pre className="overflow-x-auto rounded-sm border border-border/35 bg-muted/15 p-5 font-mono text-[13px] leading-relaxed text-foreground/90">
            <code>{block.content}</code>
          </pre>
          {block.caption ? (
            <figcaption className="mt-3 font-mono text-[11px] text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      )

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag
          className={cn(
            'space-y-3 pl-5 text-base leading-[1.75] text-foreground/80 md:text-[1.0625rem]',
            block.ordered ? 'list-decimal' : 'list-disc marker:text-muted-foreground/60',
          )}
        >
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText>{item}</RichText>
            </li>
          ))}
        </Tag>
      )
    }

    case 'callout':
      return (
        <aside className="my-10 rounded-sm border border-border/30 bg-muted/[0.07] p-6 md:p-8">
          {block.title ? (
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              {block.title}
            </p>
          ) : null}
          <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
            <RichText>{block.content}</RichText>
          </p>
        </aside>
      )

    case 'divider':
      return <hr className="border-border/20" />

    case 'video':
      return (
        <figure className="my-10">
          <div className="aspect-video overflow-hidden rounded-sm border border-border/40 bg-muted ring-1 ring-border/30">
            <iframe
              title={block.caption ?? 'Embedded video'}
              className="h-full w-full border-0"
              src={`https://www.youtube-nocookie.com/embed/${block.youtubeId}?modestbranding=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {block.caption ? (
            <figcaption className="mt-3 text-center font-mono text-[11px] text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      )

    case 'media':
      return (
        <figure className="my-10 rounded-sm border border-dashed border-border/40 bg-muted/[0.04] px-6 py-10 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            media
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {block.description}
          </p>
        </figure>
      )

    case 'table':
      return (
        <figure className="my-10 overflow-x-auto">
          <table className="w-full min-w-[20rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/35">
                {block.headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-3 py-2.5 text-left font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-border/20 last:border-0"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-2.5 leading-snug text-foreground/80"
                    >
                      <RichText>{cell}</RichText>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption ? (
            <figcaption className="mt-3 font-mono text-[11px] text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      )

    default:
      return null
  }
}
