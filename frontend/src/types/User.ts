import { z } from "zod"
import { postSchema } from "./Post"

export const userSchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  username: z.string(),
  email: z.string(),
  profileImg: z.string(),
  coverImg: z.string(),
  bio: z.string(),
  link: z.string(),
  likedPosts: z.array(postSchema),
  location: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type User = z.infer<typeof userSchema>
