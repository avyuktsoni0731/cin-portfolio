import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getSiteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin
  const now = new Date()
  const posts = getAllPosts().map((post) => ({
    url: `${base}/writing/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/work`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/writing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...posts,
  ]
}
