import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database"
import authRoute from "./routes/auth-route"
import userRoute from "./routes/user-route"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()

//define
const app = express()
const PORT = process.env.PORT || 8080

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

//database
connectDB()

//base route
app.get("/", (req, res) => {
  res.send("Hello China!")
})

//routes
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)

//Listening
app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
