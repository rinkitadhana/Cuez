"use client"
import { useGetPosts } from "@/hooks/usePost"
import PostStructure from "@/components/pageComponents/PostStructure"

const GetPosts = () => {
  const { data, isLoading } = useGetPosts()

  return (
    <section>
      {isLoading && <div className="flex justify-center p-4">Loading...</div>}
      {data &&
        data.posts &&
        data.posts.map((post) => <div key={post._id}>{post.text}</div>)}
    </section>
  )
}

export default GetPosts
