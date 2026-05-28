import { z } from "zod"
import { userSchema } from "@/types/User"

export const feedbackSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  user: userSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Feedback = z.infer<typeof feedbackSchema>
