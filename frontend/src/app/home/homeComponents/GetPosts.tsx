"use client"
import { useGetPosts } from "@/hooks/usePost"
const GetPosts = () => {

  const {data, isLoading} = useGetPosts()

    
  return (
    <section>
      {isLoading && <div>Loading...</div>}
      {data && <p>{data?.message} </p>}
    </section>
    
  
  )
}

export default GetPosts
