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
    <div className="fixed md:top-10 top-5 flex justify-center items-center w-full select-none">
      <div
        className={`md:w-1/3 w-[90%] mx-4 md:mx-auto px-5 py-2.5 text-white text-center font-medium rounded-[10px] z-[1000] ${
          type === "success" ? "bg-green-500" : "bg-red-500 "
        }`}
      >
        {message}
      </div>
    </div>
  )
}

export default Message
