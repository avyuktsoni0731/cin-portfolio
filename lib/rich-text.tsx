import Link from 'next/link'
import type { ReactNode } from 'react'

type Token =
  | { kind: 'text'; value: string }
  | { kind: 'bold'; value: string }
  | { kind: 'italic'; value: string }
  | { kind: 'link'; label: string; href: string }

function tokenize(text: string): Token[] {
  const tokens: Token[] = []
  const re =
    /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g
  let last = 0

  for (const match of text.matchAll(re)) {
    const index = match.index ?? 0
    if (index > last) tokens.push({ kind: 'text', value: text.slice(last, index) })

    const chunk = match[0]
    if (chunk.startsWith('**')) {
      tokens.push({ kind: 'bold', value: chunk.slice(2, -2) })
    } else if (chunk.startsWith('*')) {
      tokens.push({ kind: 'italic', value: chunk.slice(1, -1) })
    } else if (chunk.startsWith('[')) {
      const link = chunk.match(/\[([^\]]+)\]\(([^)]+)\)/)
      if (link) tokens.push({ kind: 'link', label: link[1], href: link[2] })
      else tokens.push({ kind: 'text', value: chunk })
    } else {
      tokens.push({ kind: 'text', value: chunk })
    }

    last = index + chunk.length
  }

  if (last < text.length) tokens.push({ kind: 'text', value: text.slice(last) })
  return tokens.length ? tokens : [{ kind: 'text', value: text }]
}

function renderToken(token: Token, key: number): ReactNode {
  switch (token.kind) {
    case 'text':
      return token.value
    case 'bold':
      return (
        <strong key={key} className="font-medium text-foreground">
          {token.value}
        </strong>
      )
    case 'italic':
      return (
        <em key={key} className="text-foreground not-italic">
          {token.value}
        </em>
      )
    case 'link': {
      const className =
        'underline decoration-border underline-offset-4 transition-colors hover:text-foreground'
      if (token.href.startsWith('http')) {
        return (
          <a
            key={key}
            href={token.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {token.label}
          </a>
        )
      }
      return (
        <Link key={key} href={token.href} className={className}>
          {token.label}
        </Link>
      )
    }
  }
}

export function RichText({ children }: { children: string }) {
  return <>{tokenize(children).map((t, i) => renderToken(t, i))}</>
}
