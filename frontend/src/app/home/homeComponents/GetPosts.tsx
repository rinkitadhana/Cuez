"use client"
import { useGetPosts } from "@/hooks/usePost"

const GetPosts = () => {
  const { data, isLoading } = useGetPosts()

  return (
    <section>
      {isLoading && <div className="flex justify-center p-4">Loading...</div>}
      {data &&
        data.posts &&
        data.posts.map((post) => (
          <div key={post._id}>
            {post?.user?.username}
            {post.text}
            {post.img && <img src={post.img} alt="post" />}
            {post.video && <video src={post.video} controls alt="post" />}
          </div>
        ))}
    </section>
  )
}

export default GetPosts
