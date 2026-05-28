import useMessageStore from "@/store/messageStore"
import config from "../config/config"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { User } from "@/types/User"

interface SendOtpResponse {
  message: string
}

const sendOtp = async (email: string): Promise<SendOtpResponse> => {
  const response = await axios.post<SendOtpResponse>(
    config.backendUrl + "/auth/send-otp",
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
    config.backendUrl + "/auth/register",
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

interface VerifyOtpRequest {
  email: string
  otp: string
}

interface VerifyOtpResponse {
  message: string
  token: string
}

const verifyOtp = async (
  userData: VerifyOtpRequest
): Promise<VerifyOtpResponse> => {
  const response = await axios.post<VerifyOtpResponse>(
    config.backendUrl + "/auth/forgot-password/verify-otp",
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
        (error.response?.data as VerifyOtpResponse)?.message ||
        "OTP verification failed!"
      setMessage(message, "error")
    },
  })
}

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
    userData,
    {
      withCredentials: true,
    }
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

interface LogoutResponse {
  message: string
}

const logout = async (): Promise<LogoutResponse> => {
  const response = await axios.post<LogoutResponse>(
    config.backendUrl + "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  )
  return response.data
}

export const useLogout = () => {
  const router = useRouter()
  const { setMessage } = useMessageStore()
  return useMutation<LogoutResponse, AxiosError, void>({
    mutationFn: logout,
    onSuccess: (data: LogoutResponse) => {
      setMessage(data.message, "success")
      router.push("/login")
    },
    onError: (error: AxiosError) => {
      const message =
        (error.response?.data as LogoutResponse)?.message || "Logout failed!"
      setMessage(message, "error")
    },
  })
}

interface GetMeResponse {
  message: string
  user: User
}

const getMe = async (): Promise<GetMeResponse> => {
  try {
    const response = await axios.get<GetMeResponse>(
      config.backendUrl + "/auth/me",
      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error) {
    console.error("Error fetching user data:", error)
    throw error
  }
}

export const useGetMe = () => {
  return useQuery<GetMeResponse, AxiosError>({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  })
}
