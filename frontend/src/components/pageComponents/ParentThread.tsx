import React from "react"
import { useGetParentThread } from "@/hooks/usePost"
import { Loader2 } from "lucide-react"
import PostStructure from "./PostStructure"

interface ParentThreadProps {
  postId: string
}

const ParentThread: React.FC<ParentThreadProps> = ({ postId }) => {
  const { data: threadData, isPending } = useGetParentThread(postId)

  if (isPending) {
    return (
      <div className="flex justify-center py-2">
        <Loader2 className="size-5 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!threadData?.thread || threadData.thread.length === 0) {
    return null
  }

  return (
    <div
      className="parent-thread twitter-thread-container"
      style={{ paddingBottom: "10px", position: "relative" }}
    >
      {threadData.thread.map((parentPost, index) => (
        <div
          key={parentPost._id}
          className={`thread-post ${
            index < threadData.thread.length - 1 ? "has-connector" : "last-post"
          }`}
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              top: index === 0 ? "50px" : "0",
              bottom: "0",
              left: "35px",
              width: "2px",
              backgroundColor: "#3F3F46",
              zIndex: "1",
              pointerEvents: "none",
            }}
          />
          <PostStructure post={parentPost} inThread={true} />
        </div>
      ))}
    </div>
  )
}

export default ParentThread
