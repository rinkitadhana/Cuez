import { errorHandler } from "../utils/errorHandler"
import User, { IUser } from "../models/user-model"
import { Request, Response } from "express"
import { v2 as cloudinary } from "cloudinary"
import Notification from "../models/notification-model"

const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username }).select("-password")
    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    res
      .status(200)
      .json({ message: "User profile fetched successfully!", user })
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
      await Notification.deleteMany({
        from: req.user._id,
        to: id,
        type: "follow",
        post: null,
      })
      return
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $push: { followings: id } })
      res.status(200).json({ message: "User followed successfully!" })
      const notification = new Notification({
        from: req.user._id,
        to: id,
        type: "follow",
        post: null,
      })
      await notification.save()
    }
  } catch (error) {
    errorHandler(res, error)
  }
}

const getSuggestedUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id
    const usersFollowedByMe = await User.findById(userId).select("followings")

    if (!usersFollowedByMe) {
      res.status(404).json({ message: "User not found!" })
      return
    }

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
    ])

    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe.followings.includes(user._id)
    )
    const suggestedUsers = filteredUsers.slice(0, 4)

    suggestedUsers.forEach((user) => (user.password = undefined))

    res.status(200).json({
      users: suggestedUsers,
      message: "Suggested users fetched successfully!",
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, username, bio, link, location } = req.body
    const { profileImg, coverImg } = req.body

    const userId = req.user._id

    const user = await User.findById(userId)

    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }

    const isUsernameTaken = await User.findOne({
      username,
      _id: { $ne: userId },
    })

    if (isUsernameTaken) {
      res.status(400).json({ message: "Username is already taken!" })
      return
    }

    if (profileImg) {
      if (user.profileImg) {
        const publicId = user.profileImg.split("/").pop()?.split(".")[0]
        if (publicId) {
          await cloudinary.uploader.destroy(`profile-images/${publicId}`)
        }
      }
      const uploadedImg = await cloudinary.uploader.upload(profileImg, {
        folder: "profile-images",
      })
      user.profileImg = uploadedImg.secure_url
    }
    if (coverImg) {
      if (user.coverImg) {
        const publicId = user.coverImg.split("/").pop()?.split(".")[0]
        if (publicId) {
          await cloudinary.uploader.destroy(`cover-images/${publicId}`)
        }
      }
      const uploadedImg = await cloudinary.uploader.upload(coverImg, {
        folder: "cover-images",
      })
      user.coverImg = uploadedImg.secure_url
    }

    user.fullName = fullName || user.fullName
    user.username = username || user.username
    user.bio = bio || user.bio
    user.link = link || user.link
    user.location = location || user.location

    await user.save()
    res.status(200).json({ message: "User profile updated successfully!" })
  } catch (error) {
    errorHandler(res, error)
  }
}

const isFollowing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const currentUser = await User.findById(req.user._id)
    const userToCheck = await User.findById(id)

    if (!currentUser || !userToCheck) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    const isFollowing = currentUser.followings.includes(id as unknown as IUser)
    res
      .status(200)
      .json({ isFollowing, message: "User is following check successful!" })
  } catch (error) {
    errorHandler(res, error)
  }
}

const getFollowings = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    const followingsDetails = await User.find({
      _id: { $in: user.followings },
    }).select("-password")
    res.status(200).json({
      followings: followingsDetails,
      message: "Followings fetched successfully!",
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

const getFollowers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (!user) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    const followersDetails = await User.find({
      _id: { $in: user.followers },
    }).select("-password")
    res.status(200).json({
      followers: followersDetails,
      message: "Followers fetched successfully!",
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

const getFollowsYou = async (req: Request, res: Response): Promise<void> => {
  try {
    const currentUser = await User.findById(req.user._id)
    const userToCheck = await User.findById(req.params.id)
    if (!currentUser || !userToCheck) {
      res.status(404).json({ message: "User not found!" })
      return
    }
    const followsYou = userToCheck.followings.includes(
      currentUser._id as unknown as IUser
    )
    res.status(200).json({
      followsYou,
      message: "Follows you check successful!",
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

export {
  getUserProfile,
  followUnfollowUser,
  getSuggestedUsers,
  updateUserProfile,
  isFollowing,
  getFollowers,
  getFollowings,
  getFollowsYou,
}
