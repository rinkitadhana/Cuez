import useMessageStore from "@/store/messageStore"
import config from "../config/config"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
  const queryClient = useQueryClient()
  return useMutation<FollowUnfollowUserResponse, AxiosError, string>({
    mutationFn: followUnfollowUser,
    onSuccess: (data: FollowUnfollowUserResponse) => {
      setMessage(data.message, "success")
      queryClient.invalidateQueries({ queryKey: ["is-following"] })
      queryClient.invalidateQueries({ queryKey: ["user-profile"] })
      queryClient.invalidateQueries({ queryKey: ["suggested-users"] })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
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

interface UserProfileResponse {
  message: string
  user: User
}

const getUserProfile = async (
  username: string
): Promise<UserProfileResponse> => {
  const response = await axios.get<UserProfileResponse>(
    config.backendUrl + `/user/profile/${username}`,
    { withCredentials: true }
  )
  return response.data
}

export const useGetUserProfile = (username: string) => {
  return useQuery<UserProfileResponse, AxiosError>({
    queryKey: ["user-profile", username],
    queryFn: () => getUserProfile(username),
  })
}

interface UpdateUserProfileResponse {
  message: string
}

interface UpdateUserProfileData {
  fullName?: string
  username?: string
  bio?: string
  link?: string
  location?: string
  profileImg?: string
  coverImg?: string
}

const updateUserProfile = async (
  profileData: UpdateUserProfileData
): Promise<UpdateUserProfileResponse> => {
  const response = await axios.patch<UpdateUserProfileResponse>(
    config.backendUrl + `/user/update-profile`,
    profileData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response.data
}

export const useUpdateUserProfile = () => {
  const { setMessage } = useMessageStore()
  const queryClient = useQueryClient()
  return useMutation<
    UpdateUserProfileResponse,
    AxiosError,
    UpdateUserProfileData
  >({
    mutationFn: updateUserProfile,
    onSuccess: (data: UpdateUserProfileResponse) => {
      setMessage(data.message, "success")
      queryClient.invalidateQueries({ queryKey: ["user-profile"] })
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as UpdateUserProfileResponse)?.message ||
        "Failed to update profile"
      setMessage(message, "error")
    },
  })
}
