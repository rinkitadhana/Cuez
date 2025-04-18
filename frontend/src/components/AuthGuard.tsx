"use client"

import { useGetMe } from "@/hooks/useAuth"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import LoadingScreen from "./LoadingScreen"

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useGetMe()
  const router = useRouter()
  const pathname = usePathname()

  const authRoutes = ['/login', '/signup', '/forgot-password']
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  useEffect(() => {
    if (!isLoading && !user && !isAuthRoute) {
      router.push("/login")
    }
  }, [isLoading, user, router, pathname, isAuthRoute])

  if ((isLoading || (!user && typeof user !== "undefined")) && !isAuthRoute) {
    return <LoadingScreen />
  }

  return <>{children}</>
}

export default AuthGuard
