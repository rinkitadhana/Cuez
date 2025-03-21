import { Request, Response } from "express"
import User from "../models/user-model"
import { errorHandler } from "../utils/errorHandler"
import Post, { IComment } from "../models/post-model"
import { v2 as cloudinary } from "cloudinary"
import Notification from "../models/notification-model"

const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, img } = req.body
    const userId = req.user._id.toString()
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    if (!text && !img) {
      res.status(400).json({ message: "Text or image is required!" })
      return
    }
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img, {
        folder: "posts",
      })
      const imgUrl = uploadedResponse.secure_url
      const post = await Post.create({
        user: user._id,
        text,
        img: imgUrl,
      })
      await post.save()
      res.status(201).json({ message: "Post created successfully!" })
    } else {
      const post = await Post.create({
        user: user._id,
        text,
      })
      await post.save()
      res.status(201).json({ message: "Post created successfully!" })
    }
  } catch (error) {
    errorHandler(res, error)
  }
}

const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      res.status(404).json({ message: "Post not found!" })
      return
    }
    if (post.user.toString() !== req.user._id.toString()) {
      res
        .status(403)
        .json({ message: "You are not authorized to delete this post!" })
      return
    }
    if (post.img) {
      const imageId = post.img.split("/").pop()?.split(".")[0]
      if (imageId) {
        await cloudinary.uploader.destroy(`posts/${imageId}`)
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
    const { text } = req.body
    const post = await Post.findById(req.params.id)
    const userId = req.user._id.toString()
    if (!text) {
      res.status(400).json({ message: "Comment text is required!" })
      return
    }
    if (!post) {
      res.status(404).json({ message: "Post not found!" })
      return
    }
    const comment = {
      text,
      user: userId,
    }
    post.comments.push(comment as IComment)
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
      res.status(200).json({ message: "Post unliked successfully!" })
    } else {
      await Post.updateOne({ _id: req.params.id }, { $push: { likes: userId } })
    }
    await post.save()
    const notification = new Notification({
      from: userId,
      to: post.user.toString(),
      type: "like",
    })
    await notification.save()
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
    res.status(200).json(posts)
  } catch (error) {
    errorHandler(res, error)
  }
}

export { createPost, deletePost, commentPost, likeUnlikePost, getAllPosts }
