import { ObjectId } from 'mongodb'
import { ensureEngagementIndexes, getDb } from '@/lib/mongodb'
import {
  buildCommentTree,
  toCommentPublic,
  type CommentDoc,
  type CommentNode,
  type CommentPublic,
} from '@/lib/writing-engagement/types'

export async function listComments(postSlug: string): Promise<CommentNode[]> {
  await ensureEngagementIndexes()
  const db = await getDb()
  const docs = await db
    .collection<CommentDoc>('comments')
    .find({ postSlug })
    .sort({ createdAt: 1 })
    .toArray()

  return buildCommentTree(docs.map(toCommentPublic))
}

export async function createComment(input: {
  postSlug: string
  authorName: string
  body: string
  parentId?: string | null
}): Promise<CommentPublic> {
  await ensureEngagementIndexes()
  const db = await getDb()

  let parentId: ObjectId | null = null
  if (input.parentId) {
    if (!ObjectId.isValid(input.parentId)) {
      throw new Error('Invalid parent comment')
    }
    parentId = new ObjectId(input.parentId)
    const parent = await db.collection<CommentDoc>('comments').findOne({
      _id: parentId,
      postSlug: input.postSlug,
    })
    if (!parent) {
      throw new Error('Parent comment not found')
    }
  }

  const doc: Omit<CommentDoc, '_id'> = {
    postSlug: input.postSlug,
    parentId,
    authorName: input.authorName,
    body: input.body,
    createdAt: new Date(),
  }

  const result = await db.collection<CommentDoc>('comments').insertOne(doc as CommentDoc)
  return toCommentPublic({ _id: result.insertedId, ...doc })
}
