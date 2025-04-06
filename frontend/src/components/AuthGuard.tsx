"use client"

import { useGetMe } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import LoadingScreen from "./LoadingScreen"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useGetMe()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [isLoading, user, router])

  if (isLoading || (!user && typeof user !== "undefined")) {
    return <LoadingScreen />
  }

  return <>{children}</>
}

export default AuthGuard
