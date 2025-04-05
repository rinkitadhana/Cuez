"use client"
import { useGetMe } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import LoadingScreen from "./LoadingScreen"

const AuthGaurd = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useGetMe()
  const router = useRouter()
  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || (!user && typeof user !== "undefined")) {
    return <LoadingScreen />
  }

  return <>{children}</>
}

export default AuthGaurd
