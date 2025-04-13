import useMessageStore from "@/store/messageStore"
import config from "../config/config"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { User } from "@/types/User"

interface SuggestedUsersResponse {
  message: string
  users: User[]
}

const getSuggestedUsers = async (): Promise<SuggestedUsersResponse> => {
  const response = await axios.get<SuggestedUsersResponse>(
    config.backendUrl + "/user/suggested",
    {
      withCredentials: true,
    }
  )
  return response.data
}

export const useGetSuggestedUsers = () => {
  return useQuery<SuggestedUsersResponse, AxiosError>({
    queryKey: ["suggested-users"],
    queryFn: getSuggestedUsers,
  })
}

interface FollowUnfollowUserResponse {
  message: string
}

const followUnfollowUser = async (
  userId: string
): Promise<FollowUnfollowUserResponse> => {
  const response = await axios.post<FollowUnfollowUserResponse>(
    config.backendUrl + `/user/follow/${userId}`,
    {},
    {
      withCredentials: true,
    }
  )
  return response.data
}

export const useFollowUnfollowUser = () => {
  const { setMessage } = useMessageStore()
  return useMutation<FollowUnfollowUserResponse, AxiosError, string>({
    mutationFn: followUnfollowUser,
    onSuccess: (data: FollowUnfollowUserResponse) => {
      setMessage(data.message, "success")
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as FollowUnfollowUserResponse)?.message ||
        "Failed to follow user"
      setMessage(message, "error")
    },
  })
}

interface IsFollowingResponse {
  message: string
  isFollowing: boolean
}

const isFollowing = async (userId: string): Promise<IsFollowingResponse> => {
  const response = await axios.get<IsFollowingResponse>(
    config.backendUrl + `/user/is-following/${userId}`,
    { withCredentials: true }
  )
  return response.data
}

export const useIsFollowing = (userId: string) => {
  return useQuery<IsFollowingResponse, AxiosError>({
    queryKey: ["is-following", userId],
    queryFn: () => isFollowing(userId),
  })
}
