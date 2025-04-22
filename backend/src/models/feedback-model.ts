import mongoose, { Document } from "mongoose"

export interface IFeedback extends Document {
  title: string
  description: string
  user: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const feedbackShema = new mongoose.Schema<IFeedback>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, collection: "feedback-data" }
)

export const Feedback = mongoose.model<IFeedback>("Feedback", feedbackShema)
