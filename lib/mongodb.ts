import { MongoClient, type Db } from 'mongodb'

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable')
  }

  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }

  return global._mongoClientPromise
}

export async function getDb(): Promise<Db> {
  const connected = await getClientPromise()
  return connected.db(process.env.MONGODB_DB_NAME ?? 'cin-portfolio')
}

let indexesReady: Promise<void> | null = null

export async function ensureEngagementIndexes(): Promise<void> {
  if (!indexesReady) {
    indexesReady = (async () => {
      const db = await getDb()
      await db
        .collection('comments')
        .createIndex({ postSlug: 1, createdAt: 1 })
      await db
        .collection('likes')
        .createIndex({ postSlug: 1, visitorId: 1 }, { unique: true })
      await db.collection('likes').createIndex({ postSlug: 1 })
    })()
  }
  await indexesReady
}
