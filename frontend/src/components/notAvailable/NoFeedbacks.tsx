"use client"
import { MessageSquare } from "lucide-react"

const NoFeedbacks = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400">
      <div className="relative mb-6">
        <MessageSquare className="w-16 h-16 animate-pulse" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-zinc-700 rounded-full" />
      </div>
      <h3 className="text-xl font-medium mb-2 text-center">
        No Feedback Available
      </h3>
      <p className="text-sm text-zinc-500 text-center">
        There are no feedback entries to display at the moment!
      </p>
    </div>
  )
}

export default NoFeedbacks
