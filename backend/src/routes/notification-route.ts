import express from "express"
import { protectRoute } from "../middlewares/ProtectRoute"
import {
  getNotifications,
  deleteNotification,
  deleteAllNotifications,
} from "../controllers/notification-controller"
const router = express.Router()

router.get("/", protectRoute, getNotifications)
router.delete("/delete-all", protectRoute, deleteAllNotifications)
router.delete("/:id", protectRoute, deleteNotification)

export default router
