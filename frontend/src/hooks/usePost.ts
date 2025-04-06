import config from "../config/config"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import useFeedTypeStore from "@/store/FeedTypeStore"
import useMessageStore from "@/store/messageStore"

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

interface CreatePostRequest {
  text?: string
  img?: string
  images?: string[]
}
interface CreatePostResponse {
  message: string
}

const createPost = async (
  postData: FormData | CreatePostRequest
): Promise<CreatePostResponse> => {
  const { data } = await axios.post<CreatePostResponse>(
    config.backendUrl + "/post/create-post",
    postData,
    {
      withCredentials: true,
      headers: {
        "Content-Type":
          postData instanceof FormData
            ? "multipart/form-data"
            : "application/json",
      },
    }
  )
  return data
}

export const useCreatePost = () => {
  const { setMessage } = useMessageStore()
  return useMutation<
    CreatePostResponse,
    AxiosError,
    FormData | CreatePostRequest
  >({
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
