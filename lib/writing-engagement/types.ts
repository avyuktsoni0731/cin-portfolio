import type { ObjectId } from 'mongodb'

export type CommentDoc = {
  _id: ObjectId
  postSlug: string
  parentId: ObjectId | null
  authorName: string
  body: string
  createdAt: Date
}

export type CommentPublic = {
  id: string
  postSlug: string
  parentId: string | null
  authorName: string
  body: string
  createdAt: string
}

export type CommentNode = CommentPublic & {
  replies: CommentNode[]
}

export type LikeDoc = {
  _id: ObjectId
  postSlug: string
  visitorId: string
  createdAt: Date
}

export function toCommentPublic(doc: CommentDoc): CommentPublic {
  return {
    id: doc._id.toString(),
    postSlug: doc.postSlug,
    parentId: doc.parentId?.toString() ?? null,
    authorName: doc.authorName,
    body: doc.body,
    createdAt: doc.createdAt.toISOString(),
  }
}

export function buildCommentTree(comments: CommentPublic[]): CommentNode[] {
  const byId = new Map<string, CommentNode>()
  const roots: CommentNode[] = []

  for (const comment of comments) {
    byId.set(comment.id, { ...comment, replies: [] })
  }

  for (const comment of comments) {
    const node = byId.get(comment.id)!
    if (comment.parentId && byId.has(comment.parentId)) {
      byId.get(comment.parentId)!.replies.push(node)
    } else {
      roots.push(node)
    }
  }

  return roots
}
