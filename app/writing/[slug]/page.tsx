import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NavHeader from '@/components/NavHeader'
import Footer from '@/components/sections/Footer'
import { ArticleView } from '@/components/writing/ArticleView'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { getSiteUrl } from '@/lib/site'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const url = new URL(`/writing/${slug}`, getSiteUrl())
  const ogImagePath = `/writing/${slug}/opengraph-image`

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: ['Avyukt Soni'],
      tags: post.tags,
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImagePath],
    },
  }
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const url = new URL(`/writing/${slug}`, getSiteUrl()).toString()

  return (
    <main className="min-h-screen">
      <NavHeader />
      <ArticleView post={post} url={url} />
      <Footer />
    </main>
  )
}
