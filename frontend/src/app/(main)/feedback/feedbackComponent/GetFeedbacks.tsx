"use client"
import React from "react"
import { useGetFeedbacks } from "@/hooks/useFeedback"
import FeedbackStructure from "@/components/pageComponents/FeedbackStructure"
import PostWithoutImage from "@/components/skeletons/PostWithoutImage"
import NoFeedbacks from "@/components/notAvailable/NoFeedbacks"

const GetFeesbacks = () => {
  const { data, isLoading, error } = useGetFeedbacks()

  if (error) {
    return <div className="text-red-500 p-4">Error loading feedbacks</div>
  }
  return (
    <>
      {isLoading && (
        <div className="flex flex-col">
          {Array.from({ length: 8 }).map((_, i) => (
            <PostWithoutImage key={i} />
          ))}
        </div>
      )}
      <div className="flex flex-col p-2 gap-2">
        {!isLoading && data?.feedbacks && data.feedbacks.length > 0
          ? data.feedbacks.map((feedback) => (
              <FeedbackStructure key={feedback._id} feedback={feedback} />
            ))
          : !isLoading && <NoFeedbacks />}
      </div>
    </>
  )
}

export default GetFeesbacks
