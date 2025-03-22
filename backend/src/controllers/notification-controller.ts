import { Request, Response } from "express"
import { errorHandler } from "../utils/errorHandler"
import Notification from "../models/notification-model"
const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user._id.toString()
    const notifications = await Notification.find({ to: userId }).populate(
      "from",
      "-password username profilePicture"
    )
    await Notification.updateMany({ to: userId }, { $set: { read: true } })
    res.status(200).json(notifications)
  } catch (error) {
    errorHandler(res, error)
  }
}

const deleteNotifications = async (
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
export { getNotifications, deleteNotification, deleteNotifications }
