import express from "express"
import { protectRoute } from "../middlewares/ProtectRoute"
import {
  commentPost,
  createPost,
  deletePost,
  getAllPosts,
  getLikedPosts,
  likeUnlikePost,
  getFollowingPosts,
  getUserPosts,
  editPost,
  isLiked,
  getPostById,
  getTrendingPosts,
} from "../controllers/post-controller"
const router = express.Router()

router.post("/create-post", protectRoute, createPost)
router.patch("/edit-post", protectRoute, editPost)
router.delete("/delete-post/:id", protectRoute, deletePost)
router.post("/like-post/:id", protectRoute, likeUnlikePost)
router.get("/is-liked/:id", protectRoute, isLiked)
router.post("/comment-post/:id", protectRoute, commentPost)
router.get("/all-posts", getAllPosts)
router.get("/following-posts", protectRoute, getFollowingPosts)
router.get("/trending-posts", getTrendingPosts)
router.get("/liked-posts/:username", protectRoute, getLikedPosts)
router.get("/user-posts/:username", protectRoute, getUserPosts)
router.get("/post/:id", getPostById)
export default router
