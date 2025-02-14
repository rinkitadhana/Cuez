import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express()
const PORT = process.env.PORT
app.get("/", (req, res) => {
  res.send(`<h1>Cuez's Backend</h1>`)
})

app.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`)
})
