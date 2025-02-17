import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database"
dotenv.config()

//define
const app = express()
const PORT = process.env.PORT || 4000

//database
connectDB()

//baseRoute
app.get("/", (req, res) => {
  res.send("Hello China!")
})

//Listening
app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
