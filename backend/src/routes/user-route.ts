import express from "express"
import { protectRoute } from "../middlewares/ProtectRoute"
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUserProfile,
  isFollowing,
} from "../controllers/user-controller"
const router = express.Router()

router.get("/profile/:username", getUserProfile)
router.get("/suggested", protectRoute, getSuggestedUsers)
router.post("/follow/:id", protectRoute, followUnfollowUser)
router.get("/is-following/:id", protectRoute, isFollowing)
router.patch("/update-profile", protectRoute, updateUserProfile)

export default router
