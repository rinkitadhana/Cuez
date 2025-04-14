import React from "react"
import { useGetPostById } from "@/hooks/usePost"
import { useParams } from "next/navigation"
import CommentStructure from "./CommentStructure"

const GetComments = () => {
  const { id: postId } = useParams()
  const { data: post } = useGetPostById(postId as string)
  return (
    <div>
      <div>
        {post?.post.comments.map((comment) => (
          <CommentStructure key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  )
}

export default GetComments
