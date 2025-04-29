import { useParams } from "next/navigation"
import { useGetLikedPosts } from "@/hooks/usePost"
import PostSkeleton from "@/components/skeletons/PostSkeleton"
import { Post } from "@/types/Post"
import PostStructure from "@/components/pageComponents/PostStructure"
import NoProfilePosts from "@/components/notAvailable/NoProfilePosts"

const GetLikedPost = () => {
  const { username } = useParams()
  const { data, isLoading, error } = useGetLikedPosts(username as string)
  return (
    <div>
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
          {data?.likedPosts.length === 0 ? (
            <NoProfilePosts />
          ) : (
            <div>
              {data?.likedPosts.map((post: Post) => (
                <PostStructure key={post._id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default GetLikedPost
