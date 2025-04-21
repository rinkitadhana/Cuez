import { Request, Response } from "express"
import { errorHandler } from "../utils/errorHandler"
import Notification from "../models/notification-model"

const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id.toString()
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" })
      return
    }
    const notifications = await Notification.find({ to: userId })
      .populate({
        path: "from",
        select: "-password",
      })
      .populate("post", "text img video")
      .sort({ createdAt: -1 })
    await Notification.updateMany({ to: userId }, { $set: { read: true } })
    res
      .status(200)
      .json({ message: "Notifications fetched successfully", notifications })
  } catch (error) {
    errorHandler(res, error)
  }
}

const deleteAllNotifications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id.toString()
    await Notification.deleteMany({ to: userId })
    res.status(200).json({ message: "All notifications deleted successfully!" })
  } catch (error) {
    errorHandler(res, error)
  }
}

const deleteNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notificationId = req.params.id
    await Notification.findByIdAndDelete(notificationId)
    res.status(200).json({ message: "Notification deleted successfully!" })
  } catch (error) {
    errorHandler(res, error)
  }
}
export { getNotifications, deleteNotification, deleteAllNotifications }
