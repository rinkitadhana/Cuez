import {
  loginUser,
  logoutUser,
  registerUser,
  sendOTP,
} from "../controllers/auth-controller"
import express from "express"
const router = express.Router()

router.post("/send-otp", sendOTP)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

export default router
