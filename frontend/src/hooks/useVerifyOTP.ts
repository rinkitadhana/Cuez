import useMessageStore from "@/store/messageStore"
import config from "../config/config"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

interface VerifyOtpRequest {
  email: string
  otp: string
}

interface VerifyOtpResponse {
  message: string
  token: string
}

const verifyOtp = async (userData: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  const response = await axios.post<VerifyOtpResponse>(
    config.backendUrl + "/forgot-password/verify-otp",
    userData
  )
  return response.data
}

export const useVerifyOtp = () => {
  const { setMessage } = useMessageStore()
  return useMutation<VerifyOtpResponse, AxiosError, VerifyOtpRequest>({
    mutationFn: verifyOtp,
    onSuccess: (data: VerifyOtpResponse) => {
      setMessage(data.message, "success")
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as VerifyOtpResponse)?.message || "OTP verification failed!"
      setMessage(message, "error")
    },
  })
}
