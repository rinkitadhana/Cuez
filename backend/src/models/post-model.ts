import mongoose, { Document } from "mongoose"

export interface IPost extends Document {
  user: mongoose.Types.ObjectId
  text?: string
  img?: string
  video?: string
  likes: mongoose.Types.ObjectId[]
  comments: IComment[]
  createdAt: Date
  updatedAt: Date
}

export interface IComment extends Document {
  user: mongoose.Types.ObjectId
  text?: string
  img?: string
  video?: string
  createdAt: Date
  updatedAt: Date
}

const postSchema = new mongoose.Schema<IPost>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    img: {
      type: String,
    },
    video: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        img: {
          type: String,
        },
        video: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true, collection: "post-data" }
)

const Post = mongoose.model<IPost>("Post", postSchema)

export default Post
