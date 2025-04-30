import mongoose, { Document } from "mongoose"

export interface IPost extends Document {
  user: mongoose.Types.ObjectId
  text?: string
  img?: string
  video?: string
  parent?: mongoose.Types.ObjectId
  threadRoot?: mongoose.Types.ObjectId
  likes: mongoose.Types.ObjectId[]
  bookmarks: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const postSchema = new mongoose.Schema<IPost>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: String,
    img: String,
    video: String,

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },

    threadRoot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, collection: "post-data" }
)

const Post = mongoose.model<IPost>("Post", postSchema)

export default Post
