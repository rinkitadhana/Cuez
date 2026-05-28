import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI
    if (!URI) {
      throw new Error("MONGO_URI environment variable is not defined")
    }
    await mongoose.connect(URI)
    console.log("MongoDB Connected!")
  } catch (error) {
    console.log("MongoDB Error: ", error)
    process.exit(1)
  }
}
export default connectDB
