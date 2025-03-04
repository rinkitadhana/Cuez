import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const getOTPEmailTemplate = (username: string, otp: string): string => {
  return `<div
  style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 48px 40px;
    background-color: #ffffff;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 20px rgba(77, 107, 254, 0.08);
  "
>
  <!-- Header Section -->
  <div style="text-align: center; margin-bottom: 40px">
    <h1
      style="
        color: #1a1a1a;
        font-size: 28px;
        font-weight: 800;
        margin: 0;
        letter-spacing: 0px;
      "
    >
      Verify Your Email Address
    </h1>
  </div>

  <!-- Content Section -->
  <div style="color: #4a5568; font-size: 16px; line-height: 1.7">
    <p style="margin-bottom: 24px">Hello ${username},</p>

    <p style="margin-bottom: 32px">
      To keep your account secure, please enter the verification code below to
      complete your email verification process.
    </p>
  </div>

  <!-- OTP Section -->
   <div
      style="
        background-color: #f8faff;
        border: 2px dashed #4d6bfe;
        border-radius: 12px;
        padding: 32px 24px;
        margin: 32px 0;
        text-align: center;
      "
    >
      <h2
        style="
          color: #4d6bfe;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: 12px;
          margin: 0;
          font-family: 'SF Mono', 'Courier New', monospace;
        "
      >
        ${otp}
      </h2>
    </div>

  <!-- Timer Section -->
  <div
    style="
      background-color: #fafbff;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 32px;
      text-align: center;
      border: 1px solid rgba(77, 107, 254, 0.1);
    "
  >
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 8px;
      "
    >
      <p
        style="
          color: #4d6bfe;
          font-size: 14px;
          font-weight: 500;
          margin: 0;
          text-align: center;
        "
      >
        Code expires in <strong>10 minutes</strong>
      </p>
    </div>
  </div>

  <!-- Security Notice -->
  <div
    style="
      padding: 24px;
      background-color: #fafbff;
      border-radius: 12px;
      margin-bottom: 32px;
    "
  >
    <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0">
      If you didn't request this code, please ignore this email or contact our
      support team immediately. We take your account security seriously.
    </p>
  </div>

  <!-- Footer -->
  <div
    style="
      text-align: center;
      color: #64748b;
      font-size: 14px;
      border-top: 1px solid #eef2ff;
      padding-top: 32px;
    "
  >
    <p style="margin: 0 0 16px 0">Best regards,</p>
    <p style="margin: 0; color: #4d6bfe; font-weight: 600">Cuez Team</p>

    <div style="margin-top: 24px; color: #a0aec0; font-size: 12px">
      <p style="margin: 0">© 2025 Cuez. All rights reserved.</p>
    </div>
  </div>
</div>

`
}

export const getLoginEmailTemplate = (username: string): string => {
  return `
  <div>New login to ${username}</div>
  `
}
