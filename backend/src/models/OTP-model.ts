import mongoose, { Document, Schema } from "mongoose"

export interface IOTP extends Document {
  email: string
  otp: string
  createdAt: Date
  userData: {
    username: string
    email: string
    password: string
  }
}

const OTPSchema = new Schema<IOTP>({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
  userData: {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
})

const OTP = mongoose.model<IOTP>("OTP", OTPSchema)
export default OTP
