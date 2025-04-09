"use client"
import PostStructure from "@/components/pageComponents/PostStructure"
import { useGetPosts } from "@/hooks/usePost"
import { Post } from "@/types/Post"
const GetPosts = () => {
  const { data, isLoading } = useGetPosts()

  return (
    <section>
      {isLoading && <div className="flex justify-center p-4">Loading...</div>}
      {data?.posts
        ? data?.posts.map((post: Post) => (
            <PostStructure key={post._id} post={post} />
          ))
        : data?.message}
    </section>
  )
}

export default GetPosts
