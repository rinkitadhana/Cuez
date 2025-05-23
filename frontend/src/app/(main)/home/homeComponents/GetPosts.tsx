"use client"
import PostStructure from "@/components/pageComponents/PostStructure"
import { useGetPosts } from "@/hooks/usePost"
import { Post } from "@/types/Post"
import PostSkeleton from "@/components/skeletons/PostSkeleton"
import NoPosts from "@/components/notAvailable/NoPosts"
const GetPosts = () => {
  const { data, isLoading } = useGetPosts()

  return (
    <section>
      {isLoading && (
        <div className="flex flex-col">
          {Array.from({ length: 8 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      )}
      {data?.posts && data.posts.length > 0 ? (
        data.posts.map((post: Post) => (
          <PostStructure key={post._id} post={post} />
        ))
      ) : (
        <NoPosts />
      )}
    </section>
  )
}

export default GetPosts
