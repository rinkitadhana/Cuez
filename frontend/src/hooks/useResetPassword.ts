import useMessageStore from "@/store/messageStore"
import config from "../config/config"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
interface ResetPasswordRequest {
  password: string
  token: string
}

interface ResetPasswordResponse {
  message: string
}

const resetPassword = async (
  userData: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await axios.post<ResetPasswordResponse>(
    config.backendUrl + "/auth/forgot-password/reset",
    userData
  )
  return response.data
}

export const useResetPassword = () => {
  const router = useRouter()
  const { setMessage } = useMessageStore()
  return useMutation<ResetPasswordResponse, AxiosError, ResetPasswordRequest>({
    mutationFn: resetPassword,
    onSuccess: (data: ResetPasswordResponse) => {
      setMessage(data.message, "success")
      router.push("/login")
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as ResetPasswordResponse)?.message ||
        "Password reset failed!"
      setMessage(message, "error")
    },
  })
}
