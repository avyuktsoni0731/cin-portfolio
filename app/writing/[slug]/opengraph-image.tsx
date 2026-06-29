import { readFile } from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import sharp from 'sharp'
import { getAllPosts, getPostBySlug, getPostOgImage } from '@/lib/posts'

export const alt = 'Article preview'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const og = getPostOgImage(post)
  if (!og) notFound()

  const filePath = path.join(process.cwd(), 'public', og.src.replace(/^\//, ''))
  const source = await readFile(filePath)

  const jpeg = await sharp(source)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer()

  return new Response(new Uint8Array(jpeg), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
