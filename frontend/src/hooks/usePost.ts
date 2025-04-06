import config from "../config/config"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import useFeedTypeStore from "@/store/FeedTypeStore"

interface Post {
  _id: string
  user: string
  text: string
  img: string
  likes: string[]
  comments: string[]
  createdAt: Date
  updatedAt: Date
}

interface GetPostsResponse {
  message: string
  posts: Post[]
}



const getPosts = async (): Promise<GetPostsResponse> => {
    const { feedType } = useFeedTypeStore()
    const getPostEndPoint = () =>{
        switch(feedType) {
            case "All":
                return "/post/all-posts"
            case "Following":
                return "/post/following-posts"
            case "Trending":
                return "/post/trending-posts"
            default:
                return "/post/all-posts"
        }
    }
    const response = await axios.get<GetPostsResponse>(
        config.backendUrl + getPostEndPoint()
    )
    return response.data
}

export const useGetPosts = () => {  
    return useQuery<GetPostsResponse, AxiosError>({
        queryKey: ["posts"],
        queryFn: getPosts,
      }
    )
  }