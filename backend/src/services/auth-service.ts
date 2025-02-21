import { generateOTP } from "utils/generateOTP"
import User from "../models/user-model"
import OTP from "../models/OTP-model"
import { sendOTPEmail } from "./email-service"
import { Response } from "express"

const sendRegistrationOTP = async (
  res: Response,
  email: string,
  username: string
): Promise<void> => {
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: "Email already registerd!" })
      return
    }
    const otp = generateOTP()
    await OTP.findOneAndDelete({ email })
    await OTP.create({
      email,
      username,
      otp,
    })

    const emailSent = await sendOTPEmail(email, username, otp)
    if (!emailSent) {
      res.status(400).json({ message: "Failed to send OTP email!" })
      return
    }
    res.status(200).json({ message: "OTP sent successfully" })
  } catch (error) {
    console.log("Error in sendingRegistrationOTP: ", error)
    res.status(500).json({ message: "Server Error" })
  }
}

export { sendRegistrationOTP }
