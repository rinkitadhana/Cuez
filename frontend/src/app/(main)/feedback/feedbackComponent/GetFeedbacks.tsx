"use client"
import React from "react"
import { useGetFeedbacks } from "@/hooks/useFeedback"
import FeedbackStructure from "@/components/pageComponents/FeedbackStructure"
import PostSkeleton from "@/components/skeletons/PostSkeleton"
import NoPosts from "@/components/pageComponents/NoPosts"

const GetFeesbacks = () => {
  const { data, isLoading, error } = useGetFeedbacks()

  if (error) {
    return <div className="text-red-500 p-4">Error loading feedbacks</div>
  }
  return (
    <div className="flex flex-col p-2 gap-2">
      {isLoading && (
        <div className="flex flex-col p-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      )}
      {data?.feedbacks && data.feedbacks.length > 0 ? (
        data.feedbacks.map((feedback) => (
          <FeedbackStructure key={feedback._id} feedback={feedback} />
        ))
      ) : (
        <NoPosts />
      )}
    </div>
  )
}

export default GetFeesbacks
