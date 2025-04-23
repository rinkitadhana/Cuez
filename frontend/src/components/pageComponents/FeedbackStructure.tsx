import { Feedback } from "@/types/Feedback"
import Image from "next/image"
import React from "react"

const FeedbackStructure = ({ feedback }: { feedback: Feedback }) => {
  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(date).toLocaleString("en-US", options)
  }
  return (
    <div className="bg-zinc-900/60 p-4 border border-zinc-700 rounded-xl">
      <div className="flex items-center mb-3">
        <Image
          width={40}
          height={40}
          src={feedback?.user?.profileImg}
          alt={feedback?.user?.fullName}
          className="w-10 h-10 rounded-xl mr-3"
        />
        <div>
          <h3 className="font-semibold">{feedback?.user?.fullName}</h3>
          <p className="text-sm text-gray-400">
            {formatDateTime(feedback?.createdAt)}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-1">{feedback?.title}</h2>
      <p className="text-gray-300">{feedback?.description}</p>
    </div>
  )
}

export default FeedbackStructure
