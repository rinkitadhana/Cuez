// src/types/post.ts
import { z } from "zod"
import { commentSchema } from "./Comment"

export const postSchema = z.object({
  _id: z.string(),
  user: z.string(), // or a nested object if you populate
  text: z.string().optional(),
  img: z.string().optional(),
  video: z.string().optional(),
  likes: z.array(z.string()), // array of user IDs
  comments: z.array(commentSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Post = z.infer<typeof postSchema>
