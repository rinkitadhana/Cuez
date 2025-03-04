import { Request, Response } from "express"
import User from "../models/user-model"
import { errorHandler } from "../utils/errorHandler"
import bcrypt from "bcryptjs"
import { clearJWT, generateJWT } from "../utils/jwt-util"
import OTP from "../models/OTP-model"
import { generateOTP } from "../utils/generateOTP"
import { sendLoginEmail, sendOTPEmail } from "../services/email-service"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET_RESET = (process.env.JWT_SECRET_RESET as string) || "secret"
const JWT_EXPIRY_RESET = "10m"

const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body
    if (!email) {
      res.status(400).json({ message: "Missing credentials!" })
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Invalid email format!" })
      return
    }
    // const existingUser = await User.findOne({ email })
    // if (existingUser) {
    //   res.status(400).json({ message: "Email already registerd!" })
    //   return
    // }
    const otp = generateOTP()
    await OTP.findOneAndDelete({ email })
    await OTP.create({
      email,
      otp,
    })
    const emailSent = await sendOTPEmail(email, email.split("@")[0], otp)
    if (!emailSent) {
      res.status(400).json({ message: "Failed to send OTP email!" })
      return
    }
    res.status(200).json({ message: "OTP sent successfully" })
  } catch (error) {
    console.log("Error in sendOTP controller: ", error)
    res.status(500).json({ message: "Server error!" })
  }
}

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, otp } = req.body

    if (!username || !email || !password || !otp) {
      res.status(400).json({ message: "Missing credentials!" })
      return
    }
    const otpRecord = await OTP.findOne({ email })
    if (!otpRecord) {
      res.status(400).json({ message: "OTP expired or not found!" })
    }

    if (otpRecord?.otp != otp) {
      res.status(400).json({ message: "Invalid OTP!" })
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
    await OTP.deleteOne({ email })
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
    sendLoginEmail(user.email, user.username)
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

const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body
    if (!email || !otp) {
      res.status(400).json("Missing credentials!")
      return
    }
    const otpRecord = await OTP.findOne({ email })
    if (!otpRecord) {
      res.status(400).json({ message: "OTP expired or not found!" })
      return
    }
    if (otpRecord?.otp != otp) {
      res.status(400).json({ message: "Invalid OTP!" })
      return
    }
    const token = jwt.sign({ email }, JWT_SECRET_RESET, {
      expiresIn: JWT_EXPIRY_RESET,
    })
    await OTP.deleteOne({ email })
    res.status(200).json({ message: "OTP verified successfully!", token })
  } catch (error) {
    console.log("Error in verifying OTP: ", error)
    res.status(500).json({ message: "Server Error!" })
  }
}

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { password, token } = req.body
    if (!password || !token) {
      res.status(400).json({ message: "Missing credentials!" })
      return
    }
    const decoded = jwt.verify(token, JWT_SECRET_RESET) as { email: string }
    const userEmail = decoded.email
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.findOne({ email: userEmail })
    if (!user) {
      res.status(400).json({ message: "User not found!" })
      return
    }
    user.password = hashedPassword
    await user.save()
    res.status(200).json({ message: "Password reset successfully!" })
  } catch (error) {
    console.log("Error in resetPassword: ", error)
    res.status(500).json({ message: "Server Error!" })
  }
}

export {
  sendOTP,
  registerUser,
  loginUser,
  logoutUser,
  verifyOTP,
  resetPassword,
}
