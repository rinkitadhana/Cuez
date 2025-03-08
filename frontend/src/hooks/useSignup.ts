import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import config from "../config/config"
import useMessageStore from "@/store/messageStore"
import { useRouter } from "next/navigation"
interface RegisterRequest {
  email: string
  username: string
  password: string
  otp: string
}

interface RegisterResponse {
  message: string
}

const register = async (
  userData: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(
    config.backendUrl + "/register",
    userData
  )
  return response.data
}

export const useRegister = () => {
  const router = useRouter()
  const { setMessage } = useMessageStore()
  return useMutation<RegisterResponse, AxiosError, RegisterRequest>({
    mutationFn: register,
    onSuccess: (data: RegisterResponse) => {
      setMessage(data.message, "success")
      router.push("/login")
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as RegisterResponse)?.message || "Signup failed!"
      setMessage(message, "error")
    },
  })
}
