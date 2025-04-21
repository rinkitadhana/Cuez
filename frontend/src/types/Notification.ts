import { z } from "zod"
import { userSchema } from "./User"

export const notificationSchema = z.object({
  _id: z.string(),
  from: userSchema,
  to: userSchema,
  type: z.string(),
  read: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Notification = z.infer<typeof notificationSchema>
