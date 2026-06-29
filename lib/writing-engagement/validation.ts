import { z } from 'zod'

const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, 'Invalid comment reference')

export const visitorIdSchema = z.string().uuid('Invalid visitor id')

export const createCommentSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(64, 'Name is too long'),
  body: z
    .string()
    .trim()
    .min(1, 'Comment cannot be empty')
    .max(2000, 'Comment is too long'),
  parentId: objectIdSchema.optional().nullable(),
})

export const toggleLikeSchema = z.object({
  visitorId: visitorIdSchema,
})
