import config from "../config/config"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import useFeedTypeStore from "@/store/FeedTypeStore"
import useMessageStore from "@/store/messageStore"
import { Post } from "../types/Post"

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
  const queryClient = useQueryClient()
  return useMutation<CreatePostResponse, AxiosError, CreatePostData>({
    mutationFn: createPost,
    onSuccess: (data: CreatePostResponse) => {
      setMessage(data.message, "success")
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as CreatePostResponse)?.message ||
        "Create Post failed!"
      setMessage(message, "error")
    },
  })
}

interface DeletePostResponse {
  message: string
}

const deletePost = async (postId: string): Promise<DeletePostResponse> => {
  const { data } = await axios.delete<DeletePostResponse>(
    config.backendUrl + `/post/delete-post/${postId}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return data
}

export const useDeletePost = () => {
  const { setMessage } = useMessageStore()
  const queryClient = useQueryClient()
  return useMutation<DeletePostResponse, AxiosError, string>({
    mutationFn: deletePost,
    onSuccess: (data: DeletePostResponse) => {
      setMessage(data.message, "success")
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as DeletePostResponse)?.message ||
        "Delete Post failed!"
      setMessage(message, "error")
    },
  })
}

interface EditPostResponse {
  message: string
}

interface EditPostData {
  text?: string
  img?: string
  video?: string
}

const editPost = async (
  postId: string,
  postData: EditPostData
): Promise<EditPostResponse> => {
  const { data } = await axios.put<EditPostResponse>(
    config.backendUrl + `/post/edit-post/${postId}`,
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

export const useEditPost = () => {
  const { setMessage } = useMessageStore()
  const queryClient = useQueryClient()
  return useMutation<
    EditPostResponse,
    AxiosError,
    { postId: string; postData: EditPostData }
  >({
    mutationFn: ({ postId, postData }) => editPost(postId, postData),
    onSuccess: (data: EditPostResponse) => {
      setMessage(data.message, "success")
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as EditPostResponse)?.message ||
        "Edit Post failed!"
      setMessage(message, "error")
    },
  })
}
