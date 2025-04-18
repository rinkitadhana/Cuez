import express from "express"
import { protectRoute } from "../middlewares/ProtectRoute"
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUserProfile,
  isFollowing,
  getFollowers,
  getFollowings,
} from "../controllers/user-controller"
const router = express.Router()

router.get("/profile/:username", getUserProfile)
router.get("/suggested", protectRoute, getSuggestedUsers)
router.post("/follow/:id", protectRoute, followUnfollowUser)
router.get("/is-following/:id", protectRoute, isFollowing)
router.patch("/update-profile", protectRoute, updateUserProfile)
router.get("/followings/:username", protectRoute, getFollowings)
router.get("/followers/:username", protectRoute, getFollowers)

export default router
