import mongoose, { Document } from "mongoose"

export interface INotification extends Document {
  from: mongoose.Types.ObjectId
  to: mongoose.Types.ObjectId
  type: "follow" | "like" | "comment"
  read: boolean
  createdAt: Date
  updatedAt: Date
}

const notificationSchema = new mongoose.Schema<INotification>(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["follow", "like", "comment"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "notifications-data" }
)

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
)

export default Notification
