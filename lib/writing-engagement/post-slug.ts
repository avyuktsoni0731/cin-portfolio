import { getPostBySlug } from '@/lib/posts'

export function assertValidPostSlug(slug: string): boolean {
  return Boolean(getPostBySlug(slug))
}
