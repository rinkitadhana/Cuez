"use client"
import PostStructure from "@/components/pageComponents/PostStructure"
import { useGetPosts } from "@/hooks/usePost"
import { Post } from "@/types/Post"
import { Loader2 } from "lucide-react"
const GetPosts = () => {
  const { data, isLoading } = useGetPosts()

  return (
    <section>
      {isLoading && (
        <div className="flex justify-center p-4">
          <Loader2 className="animate-spin text-mainclr" />
        </div>
      )}
      {data?.posts &&
        data.posts.length > 0 &&
        data.posts.map((post: Post) => (
          <PostStructure key={post._id} post={post} />
        ))}
    </section>
  )
}

export default GetPosts
