export type PostBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; level: 2 | 3; content: string }
  | {
      type: 'image'
      src: string
      alt: string
      caption?: string
      wide?: boolean
    }
  | { type: 'quote'; content: string; attribution?: string }
  | { type: 'code'; content: string; language?: string; caption?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; title?: string; content: string }
  | { type: 'divider' }
  | { type: 'video'; youtubeId: string; caption?: string }
  | { type: 'media'; description: string }
  | { type: 'mermaid'; chart: string; caption?: string }
  | {
      type: 'table'
      headers: string[]
      rows: string[][]
      caption?: string
    }

export type Post = {
  slug: string
  title: string
  subtitle: string
  description: string
  publishedAt: string
  updatedAt?: string
  readingTimeMinutes: number
  tags: string[]
  featured?: boolean
  coverImage?: { src: string; alt: string }
  blocks: PostBlock[]
}
