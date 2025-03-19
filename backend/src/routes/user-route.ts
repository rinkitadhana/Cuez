import express from "express"
import { protectRoute } from "../middlewares/ProtectRoute"
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
} from "../controllers/user-controller"
const router = express.Router()

router.get("/profile/:username", getUserProfile)
router.get("/suggested", protectRoute, getSuggestedUsers )
router.post("/follow/:id", protectRoute, followUnfollowUser)
// router.post("/update", protectRoute, updateUserProfile)

export default router
