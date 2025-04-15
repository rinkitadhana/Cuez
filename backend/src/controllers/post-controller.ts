import { Request, Response } from "express"
import User from "../models/user-model"
import { errorHandler } from "../utils/errorHandler"
import Post, { IComment } from "../models/post-model"
import { v2 as cloudinary } from "cloudinary"
import Notification from "../models/notification-model"

const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, img, video } = req.body
    const userId = req.user._id.toString()
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    if (!text && !img && !video) {
      res.status(400).json({ message: "Text or Image or Video is required!" })
      return
    }

    let postData: {
      user: typeof user._id
      text?: string
      img?: string
      video?: string
    } = {
      user: user._id,
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img, {
        folder: "posts",
        resource_type: "image",
      })
      postData = { ...postData, img: uploadedResponse.secure_url }
    }

    if (video) {
      const uploadedResponse = await cloudinary.uploader.upload(video, {
        folder: "posts",
        resource_type: "video",
      })
      postData = { ...postData, video: uploadedResponse.secure_url }
    }

    if (text) {
      postData = { ...postData, text }
    }

    const post = await Post.create(postData)
    await post.save()

    res.status(201).json({ message: "Post created successfully!" })
  } catch (error) {
    errorHandler(res, error)
  }
}

const editPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, img, video } = req.body
    const post = await Post.findById(req.params.id)
    const userId = req.user._id.toString()
    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }

    if (!post) {
      res.status(404).json({ message: "Post not found!" })
      return
    }

    if (post.user.toString() !== userId) {
      res
        .status(403)
        .json({ message: "You are not authorized to edit this post!" })
      return
    }

    if (!text && !img && !video) {
      res.status(400).json({ message: "Text or Image or Video is required!" })
      return
    }

    let updateData: {
      text?: string
      img?: string
      video?: string
    } = {}

    if (img) {
      if (post.img) {
        const oldImageId = post.img.split("/").pop()?.split(".")[0]
        if (oldImageId) {
          await cloudinary.uploader.destroy(`posts/${oldImageId}`, {
            resource_type: "image",
          })
        }
      }
      const uploadedResponse = await cloudinary.uploader.upload(img, {
        folder: "posts",
        resource_type: "image",
      })
      updateData.img = uploadedResponse.secure_url
    }

    if (video) {
      if (post.video) {
        const oldVideoId = post.video.split("/").pop()?.split(".")[0]
        if (oldVideoId) {
          await cloudinary.uploader.destroy(`posts/${oldVideoId}`, {
            resource_type: "video",
          })
        }
      }
      const uploadedResponse = await cloudinary.uploader.upload(video, {
        folder: "posts",
        resource_type: "video",
      })
      updateData.video = uploadedResponse.secure_url
    }

    if (text) {
      updateData.text = text
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    res
      .status(200)
      .json({ message: "Post updated successfully!", post: updatedPost })
  } catch (error) {
    errorHandler(res, error)
  }
}

const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id)
    const userId = req.user._id.toString()
    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }

    if (!post) {
      res.status(404).json({ message: "Post not found!" })
      return
    }

    if (post.user.toString() !== userId) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this post!" })
      return
    }

    if (post.img) {
      const imageId = post.img.split("/").pop()?.split(".")[0]
      if (imageId) {
        await cloudinary.uploader.destroy(`posts/${imageId}`, {
          resource_type: "image",
        })
      }
    }

    if (post.video) {
      const videoId = post.video.split("/").pop()?.split(".")[0]
      if (videoId) {
        await cloudinary.uploader.destroy(`posts/${videoId}`, {
          resource_type: "video",
        })
      }
    }
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Post deleted successfully!" })
  } catch (error) {
    errorHandler(res, error)
  }
}

const commentPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, img, video } = req.body
    const post = await Post.findById(req.params.id)
    const userId = req.user._id.toString()
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    if (!text && !img && !video) {
      res.status(400).json({ message: "Comment is required!" })
      return
    }
    if (!post) {
      res.status(404).json({ message: "Post not found!" })
      return
    }

    let commentData: {
      user: typeof user._id
      text?: string
      img?: string
      video?: string
    } = {
      user: user._id,
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img, {
        folder: "comments",
        resource_type: "image",
      })
      commentData = { ...commentData, img: uploadedResponse.secure_url }
    }

    if (video) {
      const uploadedResponse = await cloudinary.uploader.upload(video, {
        folder: "comments",
        resource_type: "video",
      })
      commentData = { ...commentData, video: uploadedResponse.secure_url }
    }

    if (text) {
      commentData = { ...commentData, text }
    }
    post.comments.push(commentData as IComment)
    await post.save()
    res.status(200).json({ message: "Comment added successfully!" })
  } catch (error) {
    errorHandler(res, error)
  }
}

const likeUnlikePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id)
    const userId = req.user._id.toString()
    if (!post) {
      res.status(404).json({ message: "Post not found!" })
      return
    }
    const userLikedPost = post.likes.includes(userId)
    if (userLikedPost) {
      await Post.updateOne({ _id: req.params.id }, { $pull: { likes: userId } })
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: post._id } })
      res.status(200).json({ message: "Post unliked successfully!" })
      await Notification.deleteMany({
        from: userId,
        to: post.user.toString(),
        type: "like",
      })
      return
    } else {
      await Post.updateOne({ _id: req.params.id }, { $push: { likes: userId } })
      await User.updateOne({ _id: userId }, { $push: { likedPosts: post._id } })
      await post.save()
      const notification = new Notification({
        from: userId,
        to: post.user.toString(),
        type: "like",
      })
      await notification.save()
    }
    res.status(200).json({ message: "Post liked successfully!" })
  } catch (error) {
    errorHandler(res, error)
  }
}

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
    if (posts.length === 0) {
      res.status(404).json({ message: "No posts found!" })
      return
    }
    res.status(200).json({ message: "Got all posts successfully", posts })
  } catch (error) {
    errorHandler(res, error)
  }
}

const getLikedPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username })
    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
    res
      .status(200)
      .json({ message: "Liked posts fetched successfully!", likedPosts })
  } catch (error) {
    errorHandler(res, error)
  }
}

const getFollowingPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id.toString()
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    const followingPosts = await Post.find({ user: { $in: user.followings } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
    if (followingPosts.length === 0) {
      res
        .status(200)
        .json({ message: "No posts from following users!", posts: [] })
      return
    }
    res.status(200).json({
      message: "Following posts fetched successfully!",
      posts: followingPosts,
    })
  } catch (error) {
    errorHandler(res, error)
  }
}
const getTrendingPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const trendingPosts = await Post.aggregate([
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      {
        $sort: { likesCount: -1 },
      },
    ]).exec()

    const populatedPosts = await Post.populate(trendingPosts, [
      {
        path: "user",
        select: "-password",
      },
      {
        path: "comments.user",
        select: "-password",
      },
    ])

    if (populatedPosts.length === 0) {
      res.status(200).json({ message: "No posts found!", posts: [] })
      return
    }

    res.status(200).json({
      message: "Trending posts fetched successfully!",
      posts: populatedPosts,
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

const getUserPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username })
    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    const userPosts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
    res
      .status(200)
      .json({ message: "User posts fetched successfully!", userPosts })
  } catch (error) {
    errorHandler(res, error)
  }
}

const isLiked = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
    const userId = req.user.id

    if (!post) {
      res.status(404).json({ message: "Post not found" })
      return
    }
    const liked = post.likes.includes(userId)
    res.status(200).json({ liked })
  } catch (error) {
    errorHandler(res, error)
  }
}

const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      })
    if (!post) {
      res.status(404).json({ message: "Post not found" })
      return
    }
    res.status(200).json({ message: "Post found", post })
  } catch (error) {
    errorHandler(res, error)
  }
}

export {
  createPost,
  deletePost,
  commentPost,
  likeUnlikePost,
  getAllPosts,
  getLikedPosts,
  getFollowingPosts,
  getUserPosts,
  editPost,
  isLiked,
  getPostById,
  getTrendingPosts,
}
