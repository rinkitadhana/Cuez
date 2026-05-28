"use client"
import React, { useEffect } from "react"
import useMessageStore from "../store/messageStore"
import { CircleAlert, CircleCheck } from "lucide-react"

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
    <div className="fixed left-0 bottom-0 w-full flex justify-start items-center p-5 pointer-events-none z-[999999]">
      <div className="w-fit px-4 py-2.5 text-white text-center text-sm font-medium rounded-full flex items-center gap-2 bg-zinc-800/90 shadow-xl backdrop-blur-sm border border-zinc-700 pointer-events-auto">
        {type === "success" ? (
          <span className="text-green-500">
            <CircleCheck size={18} />
          </span>
        ) : (
          <span className="text-red-500">
            <CircleAlert size={18} />
          </span>
        )}
        {message}
      </div>
    </div>
  )
}

export default Message
