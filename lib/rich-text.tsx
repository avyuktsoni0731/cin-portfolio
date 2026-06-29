import Link from 'next/link'
import type { ReactNode } from 'react'

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g
const BOLD_RE = /\*\*([^*]+)\*\*/g
const ITALIC_RE = /\*([^*]+)\*/g

function applyPattern(
  text: string,
  pattern: RegExp,
  render: (match: string, key: string) => ReactNode,
): ReactNode[] {
  const parts: ReactNode[] = []
  let last = 0
  let key = 0
  const re = new RegExp(pattern.source, pattern.flags)

  for (const match of text.matchAll(re)) {
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    parts.push(render(match[0], `m-${key++}`))
    last = index + match[0].length
  }

  if (last < text.length) parts.push(text.slice(last))
  return parts.length ? parts : [text]
}

function inlineNodes(text: string): ReactNode[] {
  let nodes: ReactNode[] = [text]

  nodes = nodes.flatMap((node) =>
    typeof node === 'string'
      ? applyPattern(node, BOLD_RE, (_, key) => (
          <strong key={key} className="font-medium text-foreground">
            {node.match(BOLD_RE)?.[1]}
          </strong>
        ))
      : node,
  )

  nodes = nodes.flatMap((node) =>
    typeof node === 'string'
      ? applyPattern(node, ITALIC_RE, (full, key) => (
          <em key={key} className="text-foreground not-italic">
            {full.slice(1, -1)}
          </em>
        ))
      : node,
  )

  nodes = nodes.flatMap((node) =>
    typeof node === 'string'
      ? applyPattern(node, LINK_RE, (full, key) => {
          const m = full.match(LINK_RE)
          if (!m) return full
          const [, label, href] = m
          const external = href.startsWith('http')
          const className =
            'underline decoration-border underline-offset-4 transition-colors hover:text-foreground'
          return external ? (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {label}
            </a>
          ) : (
            <Link key={key} href={href} className={className}>
              {label}
            </Link>
          )
        })
      : node,
  )

  return nodes
}

export function RichText({ children }: { children: string }) {
  return <>{inlineNodes(children)}</>
}
