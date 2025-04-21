import useMessageStore from "@/store/messageStore"
import config from "../config/config"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { Notification } from "@/types/Notification"

interface GetNotificationsResponse {
  message: string
  notifications: Notification[]
}

const getNotifications = async (): Promise<GetNotificationsResponse> => {
  const response = await axios.get<GetNotificationsResponse>(
    `${config.backendUrl}/notification`
  )
  return response.data
}

export const useGetNotifications = () => {
  return useQuery<GetNotificationsResponse, AxiosError>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  })
}

interface DeleteAllNotificationsResponse {
  message: string
}

const deleteAllNotifications =
  async (): Promise<DeleteAllNotificationsResponse> => {
    const response = await axios.get<DeleteAllNotificationsResponse>(
      `${config.backendUrl}/notification/delete-all`
    )
    return response.data
  }

export const useDeleteAllNotifications = () => {
  const queryClient = useQueryClient()
  const { setMessage } = useMessageStore()
  return useMutation<DeleteAllNotificationsResponse, AxiosError>({
    mutationFn: deleteAllNotifications,
    onSuccess: (data: DeleteAllNotificationsResponse) => {
      setMessage(data.message, "success")
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as DeleteAllNotificationsResponse)?.message ||
        "Failed to delete all notifications!"
      setMessage(message, "error")
    },
  })
}

interface DeleteNotificationResponse {
  message: string
}

const deleteNotification = async (
  id: string
): Promise<DeleteNotificationResponse> => {
  const response = await axios.delete<DeleteNotificationResponse>(
    `${config.backendUrl}/notification/${id}`
  )
  return response.data
}

export const useDeleteNotification = () => {
  const queryClient = useQueryClient()
  const { setMessage } = useMessageStore()
  return useMutation<DeleteNotificationResponse, AxiosError, string>({
    mutationFn: deleteNotification,
    onSuccess: (data: DeleteNotificationResponse) => {
      setMessage(data.message, "success")
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as DeleteNotificationResponse)?.message ||
        "Failed to delete notification!"
      setMessage(message, "error")
    },
  })
}
