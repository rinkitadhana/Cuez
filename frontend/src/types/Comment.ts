import { z } from "zod"

export const commentSchema = z.object({
  _id: z.string(),
  user: z.string(),
  text: z.string().optional(),
  img: z.string().optional(),
  video: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Comment = z.infer<typeof commentSchema>
