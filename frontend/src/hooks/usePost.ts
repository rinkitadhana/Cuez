import config from "../config/config"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import useFeedTypeStore from "@/store/FeedTypeStore"
import useMessageStore from "@/store/messageStore"
import { Post, postSchema } from "../types/Post"

interface GetPostsResponse {
  message: string
  posts: Post[]
}

const getPosts = async (feedType: string): Promise<GetPostsResponse> => {
  const getPostEndPoint = () => {
    switch (feedType) {
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
  try {
    const response = await axios.get<GetPostsResponse>(
      config.backendUrl + getPostEndPoint()
    )
    return response.data
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw error
  }
}

export const useGetPosts = () => {
  const { feedType } = useFeedTypeStore()
  return useQuery<GetPostsResponse, AxiosError>({
    queryKey: ["posts", feedType],
    queryFn: () => getPosts(feedType),
  })
}

interface CreatePostResponse {
  message: string
}

interface CreatePostData {
  text?: string
  img?: string
  video?: string
}

const createPost = async (
  postData: CreatePostData
): Promise<CreatePostResponse> => {
  const { data } = await axios.post<CreatePostResponse>(
    config.backendUrl + "/post/create-post",
    postData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return data
}

export const useCreatePost = () => {
  const { setMessage } = useMessageStore()
  return useMutation<CreatePostResponse, AxiosError, CreatePostData>({
    mutationFn: createPost,
    onSuccess: (data: CreatePostResponse) => {
      setMessage(data.message, "success")
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as CreatePostResponse)?.message ||
        "Create Post failed!"
      setMessage(message, "error")
    },
  })
}
