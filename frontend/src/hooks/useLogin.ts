import useMessageStore from "@/store/messageStore"
import config from "../config/config"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
interface LoginRequest {
  identifier: string
  password: string
}

interface LoginResponse {
  message: string
}

const login = async (userData: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    config.backendUrl + "/auth/login",
    userData
  )
  return response.data
}

export const useLogin = () => {
  const router = useRouter()
  const { setMessage } = useMessageStore()
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: login,
    onSuccess: (data: LoginResponse) => {
      setMessage(data.message, "success")
      router.push("/")
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as LoginResponse)?.message || "Login failed!"
      setMessage(message, "error")
    },
  })
}
