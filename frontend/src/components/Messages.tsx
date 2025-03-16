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
    <div className="fixed left-5 bottom-5 flex justify-start items-center w-full select-none">
      <div
        className="w-fit px-4 py-2.5 text-white text-center font-medium rounded-full z-[1000] flex items-center gap-2 bg-zinc-800 "
      >
        {
        type === "success" ? <span className="text-green-500"><CircleCheck /></span> : <span className="text-red-500"><CircleAlert /></span>
        }
        {message}
      </div>
    </div>
  )
}

export default Message
