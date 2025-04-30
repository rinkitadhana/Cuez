"use client"
import { useGetNotifications } from "@/hooks/useNotification"
import NotificationMessage from "./NotificationMessage"
import Notification from "@/components/skeletons/Notification"
import NoNotification from "./NoNotification"
import { AlertCircle } from "lucide-react"

const GetNotification = () => {
  const { data, isLoading, error } = useGetNotifications()

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col divide-y divide-zinc-800">
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => <Notification key={i} />)
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-indigo-400">
          <AlertCircle className="w-8 h-8 mb-3 text-indigo-500" />
          <p className="text-base">Failed to load notifications</p>
          <p className="text-sm text-zinc-500 mt-1">Please try again later</p>
        </div>
      ) : data?.notifications.length === 0 ? (
        <NoNotification />
      ) : (
        data?.notifications.map((notification) => (
          <NotificationMessage
            key={notification._id}
            notification={notification}
          />
        ))
      )}
    </div>
  )
}

export default GetNotification
