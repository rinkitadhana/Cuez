import { generateOTP } from "utils/generateOTP"
import User from "../models/user-model"
import OTP from "../models/OTP-model"
import { sendOTPEmail } from "./email-service"

const sendRegistrationOTP = async (
  email: string,
  username: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { success: false, message: "Email already registerd!" }
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
      return { success: false, message: "Failed to send OTP email!" }
    }
    return { success: true, message: "OTP sent successfully" }
  } catch (error) {
    console.log("Error in sendingRegistrationOTP: ", error)
    return { success: false, message: "Server Error" }
  }
}

export { sendRegistrationOTP }
