import mongoose, { Document } from "mongoose"
import { IPost } from "./post-model"

interface IUser extends Document {
  fullName: string
  username: string
  email: string
  password: string
  followers: IUser[]
  followings: IUser[]
  profileImg: string
  coverImg: string
  bio: string
  link: string
  likedPosts: IPost[]
  location: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      default: function () {
        return this.username
      },
    },
    username: {
      type: String,
      required: [true, "Name is required!"],
      unique: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters long!"],
      maxlength: [20, "Name cannot exceed 50 characters!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value: string): boolean {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return emailRegex.test(value)
        },
        message: "Invalid email format!",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be at least 8 characters long!"],
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    followings: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [
          new mongoose.Types.ObjectId("6613f51d8e9c5cc171d53710"),
          new mongoose.Types.ObjectId("6613f5b78e9c5cc171d53722"),
        ],
      },
    ],
    profileImg: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg",
    },
    coverImg: {
      type: String,
      default: "https://flowbite.com/docs/images/examples/image-3@2x.jpg",
    },
    bio: {
      type: String,
      default: "I use Cuez btw.",
    },
    link: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "Earth, Milky Way",
    },
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    collection: "user-data",
  }
)

const User = mongoose.model<IUser>("User", userSchema)

export default User

export { IUser }
