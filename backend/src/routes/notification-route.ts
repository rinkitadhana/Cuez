import express from "express"
import { protectRoute } from "../middlewares/ProtectRoute"
import {
  getNotifications,
  deleteNotification,
  deleteNotifications,
} from "../controllers/notification-controller"
const router = express.Router()

router.get("/", protectRoute, getNotifications)
router.get("/delete-all", protectRoute, deleteNotifications)
router.delete("/:id", protectRoute, deleteNotification)

export default router
