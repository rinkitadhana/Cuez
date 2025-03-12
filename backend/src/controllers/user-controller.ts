import { errorHandler } from "../utils/errorHandler"
import User, { IUser } from "../models/user-model"
import { Request, Response } from "express"

const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username }).select("-password")
    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    res.status(200).json(user)
  } catch (error) {
    errorHandler(res, error)
  }
}

const followUnfollowUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const userToModify = await User.findById(id)
    const currentUser = await User.findById(req.user._id)

    if (!userToModify || !currentUser) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    if (id == req.user._id.toString()) {
      res.status(400).json({ message: "You cannot follow/unfollow yourself!" })
      return
    }
    const isFollowing = currentUser.followings.includes(id as unknown as IUser)
    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $pull: { followings: id } })
      res.status(200).json({ message: "User unfollowed successfully!" })
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $push: { followings: id } })
      res.status(200).json({ message: "User followed successfully!" })
    }
  } catch (error) {
    errorHandler(res, error)
  }
}

export { getUserProfile, followUnfollowUser }
