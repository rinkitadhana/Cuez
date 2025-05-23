import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database"
import authRoute from "./routes/auth-route"
import userRoute from "./routes/user-route"
import postRoute from "./routes/post-route"
import notificationRoute from "./routes/notification-route"
import feedbackRoute from "./routes/feedback-route"

import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()
import { v2 as cloudinary } from "cloudinary"

//define
const app = express()
const PORT = process.env.PORT || 8080

//middlewares
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

//database
connectDB()

//base route
app.get("/", (req, res) => {
  res.send("Hello China!")
})

//routes
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/post", postRoute)
app.use("/api/notification", notificationRoute)
app.use("/api/feedback", feedbackRoute)

//Listening
app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
