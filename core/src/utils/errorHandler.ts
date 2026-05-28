import { Response } from "express"

export const errorHandler = (res: Response, error: any) => {
  console.log("Server Error:", error)
  res.status(500).json({ message: "Server Error!" })
}
