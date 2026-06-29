import { ensureEngagementIndexes, getDb } from '@/lib/mongodb'
import type { LikeDoc } from '@/lib/writing-engagement/types'

export async function getLikeState(
  postSlug: string,
  visitorId?: string,
): Promise<{ count: number; liked: boolean }> {
  await ensureEngagementIndexes()
  const db = await getDb()
  const collection = db.collection<LikeDoc>('likes')

  const [count, existing] = await Promise.all([
    collection.countDocuments({ postSlug }),
    visitorId
      ? collection.findOne({ postSlug, visitorId })
      : Promise.resolve(null),
  ])

  return { count, liked: Boolean(existing) }
}

export async function toggleLike(
  postSlug: string,
  visitorId: string,
): Promise<{ count: number; liked: boolean }> {
  await ensureEngagementIndexes()
  const db = await getDb()
  const collection = db.collection<LikeDoc>('likes')

  const existing = await collection.findOne({ postSlug, visitorId })
  if (existing) {
    await collection.deleteOne({ _id: existing._id })
  } else {
    await collection.insertOne({
      postSlug,
      visitorId,
      createdAt: new Date(),
    })
  }

  return getLikeState(postSlug, visitorId)
}
