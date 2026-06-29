import { NextResponse } from 'next/server'
import { listComments, createComment } from '@/lib/writing-engagement/comments'
import { assertValidPostSlug } from '@/lib/writing-engagement/post-slug'
import { createCommentSchema } from '@/lib/writing-engagement/validation'

type RouteContext = { params: Promise<{ slug: string }> }

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params
  if (!assertValidPostSlug(slug)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  try {
    const comments = await listComments(slug)
    return NextResponse.json({ comments })
  } catch (error) {
    console.error('[comments GET]', error)
    return NextResponse.json(
      { error: 'Could not load comments' },
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
    const parsed = createCommentSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? 'Invalid comment' },
        { status: 400 },
      )
    }

    const comment = await createComment({
      postSlug: slug,
      authorName: parsed.data.authorName,
      body: parsed.data.body,
      parentId: parsed.data.parentId ?? null,
    })

    return NextResponse.json({ comment }, { status: 201 })
  } catch (error) {
    console.error('[comments POST]', error)
    const message =
      error instanceof Error ? error.message : 'Could not save comment'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
