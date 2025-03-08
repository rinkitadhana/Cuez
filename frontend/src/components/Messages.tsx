"use client"
import React, { useEffect } from "react"
import useMessageStore from "../store/messageStore"

const Message: React.FC = () => {
  const { message, type, clearMessage } = useMessageStore()

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [message, clearMessage])

  if (!message) return null

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-md ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white z-[1000] shadow-lg`}
    >
      {message}
    </div>
  )
}

export default Message
