import { NextResponse } from 'next/server'
import { getLikeState, toggleLike } from '@/lib/writing-engagement/likes'
import { assertValidPostSlug } from '@/lib/writing-engagement/post-slug'
import { toggleLikeSchema, visitorIdSchema } from '@/lib/writing-engagement/validation'

type RouteContext = { params: Promise<{ slug: string }> }

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params
  if (!assertValidPostSlug(slug)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const visitorId = new URL(request.url).searchParams.get('visitorId')
  const visitorParsed = visitorId
    ? visitorIdSchema.safeParse(visitorId)
    : null

  try {
    const state = await getLikeState(
      slug,
      visitorParsed?.success ? visitorParsed.data : undefined,
    )
    return NextResponse.json(state)
  } catch (error) {
    console.error('[likes GET]', error)
    return NextResponse.json(
      { error: 'Could not load likes' },
      { status: 500 },
    )
  }
}

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params
  if (!assertValidPostSlug(slug)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  try {
    const json = await request.json()
    const parsed = toggleLikeSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? 'Invalid request' },
        { status: 400 },
      )
    }

    const state = await toggleLike(slug, parsed.data.visitorId)
    return NextResponse.json(state)
  } catch (error) {
    console.error('[likes POST]', error)
    return NextResponse.json(
      { error: 'Could not update like' },
      { status: 500 },
    )
  }
}
