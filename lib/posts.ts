import { FORZA_BENCHMARK_POST } from '@/lib/posts/forza-benchmark'
import type { Post, PostBlock } from '@/lib/posts/types'

export type { Post, PostBlock }

export const POSTS: Post[] = [FORZA_BENCHMARK_POST]

export function getAllPosts(): Post[] {
  return [...POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function getFeaturedPost(): Post | undefined {
  return POSTS.find((p) => p.featured) ?? getAllPosts()[0]
}

export function getPostOgImage(
  post: Post,
): { src: string; alt: string } | undefined {
  if (post.coverImage) return post.coverImage
  const hero = post.blocks.find((block) => block.type === 'image')
  if (hero?.type === 'image') {
    return { src: hero.src, alt: hero.alt }
  }
  return undefined
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
