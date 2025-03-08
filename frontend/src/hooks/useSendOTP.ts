import useMessageStore from "@/store/messageStore"
import config from "../config/config"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

interface SendOtpResponse {
  message: string
}

const sendOtp = async (email: string): Promise<SendOtpResponse> => {
  const response = await axios.post<SendOtpResponse>(
    config.backendUrl + "/send-otp",
    { email }
  )
  return response.data
}

export const useSendOtp = () => {
  const { setMessage } = useMessageStore()
  return useMutation<SendOtpResponse, AxiosError, string>({
    mutationFn: sendOtp,
    onSuccess: (data: SendOtpResponse) => {
      setMessage(data.message, "success")
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as SendOtpResponse)?.message ||
        "Failed to send OTP!"
      setMessage(message, "error")
    },
  })
}
