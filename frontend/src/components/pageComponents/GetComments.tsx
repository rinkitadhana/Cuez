import React from "react"
import { useGetReplies } from "@/hooks/usePost"
import { useParams } from "next/navigation"
import PostStructure from "./PostStructure"
import { Loader2 } from "lucide-react"

const GetComments = () => {
  const { id: postId } = useParams()
  const { data: repliesData, isPending } = useGetReplies(postId as string)

  if (isPending) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="size-6 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!repliesData?.replies || repliesData.replies.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No replies yet. Be the first to reply!
      </div>
    )
  }

  return (
    <div className="replies-container">
      {repliesData.replies.map((reply) => (
        <PostStructure key={reply._id} post={reply} />
      ))}
    </div>
  )
}

export default GetComments
