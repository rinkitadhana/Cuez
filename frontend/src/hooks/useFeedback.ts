import config from "@/config/config"
import useMessageStore from "@/store/messageStore"
import { Feedback } from "@/types/Feedback"
import axios, { AxiosError } from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface CreateFeedbackResponse {
  message: string
}

const createFeedback = async (
  feedback: Feedback
): Promise<CreateFeedbackResponse> => {
  const { data } = await axios.post<CreateFeedbackResponse>(
    `${config.backendUrl}/create-feedback`,
    feedback,
    {
      withCredentials: true,
    }
  )
  return data
}

export const useCreateFeedback = () => {
  const { setMessage } = useMessageStore()
  const queryClient = useQueryClient()
  return useMutation<CreateFeedbackResponse, AxiosError, Feedback>({
    mutationFn: createFeedback,
    onSuccess: (data: CreateFeedbackResponse) => {
      setMessage(data.message, "success")
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] })
      queryClient.invalidateQueries({ queryKey: ["all-feedbacks"] })
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as CreateFeedbackResponse)?.message ||
        "Create feedback failed!"
      setMessage(message, "error")
    },
  })
}

interface GetFeedbacksResponse {
  feedbacks: Feedback[]
  message: string
}

const getFeedbacks = async (): Promise<GetFeedbacksResponse> => {
  const { data } = await axios.get(`${config.backendUrl}/all-feedbacks`, {
    withCredentials: true,
  })
  return data
}

export const useGetFeedbacks = () => {
  return useQuery({
    queryKey: ["all-feedbacks"],
    queryFn: getFeedbacks,
  })
}
