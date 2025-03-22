import express from "express"
import { protectRoute } from "../middlewares/ProtectRoute"
import {
  commentPost,
  createPost,
  deletePost,
  getAllPosts,
  getLikedPosts,
  likeUnlikePost,
} from "../controllers/post-controller"
const router = express.Router()

router.post("/create-post", protectRoute, createPost)
router.delete("/delete-post/:id", protectRoute, deletePost)
router.post("/like-post/:id", protectRoute, likeUnlikePost)
router.post("/comment-post/:id", protectRoute, commentPost)
router.get("/all-posts", getAllPosts)
router.get("/liked-posts", protectRoute, getLikedPosts)
export default router
