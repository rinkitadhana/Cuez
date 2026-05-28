import {
  createFeedback,
  getFeedbacks,
} from "../controllers/feedback-controllers"
import express from "express"
import { protectRoute } from "../middlewares/ProtectRoute"
const router = express.Router()

router.post("/create-feedback", protectRoute, createFeedback)
router.get("/all-feedbacks", protectRoute, getFeedbacks)

export default router
