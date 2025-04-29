import PostStructure from "@/components/pageComponents/PostStructure"
import { useGetUserPosts } from "@/hooks/usePost"
import { Post } from "@/types/Post"
import { useParams } from "next/navigation"
import React from "react"
import PostSkeleton from "@/components/skeletons/PostSkeleton"
import NoProfilePosts from "@/components/notAvailable/NoProfilePosts"
const GetUserPost = () => {
  const { username } = useParams()
  const { data, isLoading, error } = useGetUserPosts(username as string)

  return (
    <>
      {isLoading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      {error && <div>{error.message}</div>}
      {data && (
        <>
          {data?.userPosts.length === 0 ? (
            <NoProfilePosts />
          ) : (
            <div>
              {data?.userPosts.map((post: Post) => (
                <PostStructure key={post._id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default GetUserPost
