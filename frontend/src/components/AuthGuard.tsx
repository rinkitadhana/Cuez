"use client"

import { useGetMe } from "@/hooks/useAuth"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoadingScreen from "./LoadingScreen"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, error } = useGetMe()
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  const authRoutes = ["/login", "/signup", "/forgot-password"]
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  useEffect(() => {
    if (!isLoading) {
      setIsChecking(false)
      if (!user && !isAuthRoute) {
        router.push("/login")
      }
    }
  }, [isLoading, user, router, pathname, isAuthRoute])

  if ((isChecking || isLoading) && !isAuthRoute) {
    return <LoadingScreen />
  }

  return <>{children}</>
}

export default AuthGuard
