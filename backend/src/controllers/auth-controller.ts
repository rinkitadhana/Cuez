import { Request, Response } from "express"
import User from "../models/user-model"
import { errorHandler } from "../utils/errorHandler"
import bcrypt from "bcryptjs"
import { clearJWT, generateJWT } from "../utils/jwt-util"

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      res.status(400).json({ message: "Missing credentials!" })
      return
    }
    const existingEmail = await User.findOne({ email })
    const existingUsername = await User.findOne({ username })
    if (existingEmail || existingUsername) {
      res.status(400).json({
        message: existingEmail
          ? "Email already exists!"
          : "Username already exists!",
      })
      return
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })
    await newUser.save()
    res.status(201).json({ message: "User created successfully!" })
  } catch (error) {
    errorHandler(res, error)
  }
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body

    if (!identifier || !password) {
      res.status(400).json({ message: "Missing credentials!" })
      return
    }
    const user = identifier.includes("@")
      ? await User.findOne({ email: identifier })
      : await User.findOne({ username: identifier })
    if (!user) {
      res.status(400).json({ message: "Invalid user!" })
      return
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password!" })
      return
    }
    generateJWT(res, user._id as string)
    res.status(200).json({ message: "Login successful!" })
  } catch (error) {
    errorHandler(res, error)
  }
}

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    clearJWT(res)
    res.status(200).json({ message: "Logout successful!" })
  } catch (error) {
    errorHandler(res, error)
  }
}

export { registerUser, loginUser, logoutUser }
