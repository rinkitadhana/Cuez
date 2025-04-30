import express from "express"
import { protectRoute } from "../middlewares/ProtectRoute"
import {
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
  bookmarkPost,
  getBookmarkedPosts,
  isBookmarked,
  getReplies,
  getReplyCount,
} from "../controllers/post-controller"
const router = express.Router()

router.post("/create-post", protectRoute, createPost)
router.patch("/edit-post/:id", protectRoute, editPost)
router.delete("/delete-post/:id", protectRoute, deletePost)
router.post("/like-post/:id", protectRoute, likeUnlikePost)
router.get("/is-liked/:id", protectRoute, isLiked)
router.get("/all-posts", getAllPosts)
router.get("/following-posts", protectRoute, getFollowingPosts)
router.get("/trending-posts", getTrendingPosts)
router.get("/liked-posts/:username", protectRoute, getLikedPosts)
router.get("/user-posts/:username", protectRoute, getUserPosts)
router.post("/bookmark-post/:id", protectRoute, bookmarkPost)
router.get("/is-bookmarked/:id", protectRoute, isBookmarked)
router.get("/bookmarked-posts", protectRoute, getBookmarkedPosts)
router.get("/replies/:postId", getReplies)
router.get("/reply-count/:postId", getReplyCount)

router.get("/post/:id", getPostById)
export default router
