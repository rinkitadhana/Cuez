import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database"
import userRoute from "./routes/auth-route"
import cookieParser from "cookie-parser"
dotenv.config()

//define
const app = express()
const PORT = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cookieParser())

//database
connectDB()

//base route
app.get("/", (req, res) => {
  res.send("Hello China!")
})

//routes
app.use("/api", userRoute)

//Listening
app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
