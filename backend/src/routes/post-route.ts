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
} from "../controllers/post-controller"
const router = express.Router()

router.post("/create-post", protectRoute, createPost)
router.patch("/edit-post", protectRoute, editPost)
router.delete("/delete-post/:id", protectRoute, deletePost)
router.post("/like-post/:id", protectRoute, likeUnlikePost)
router.post("/comment-post/:id", protectRoute, commentPost)
router.get("/all-posts", getAllPosts)
router.get("/following-posts", protectRoute, getFollowingPosts)
router.get("/liked-posts", protectRoute, getLikedPosts)
router.get("/user-posts/:username", protectRoute, getUserPosts)
export default router
