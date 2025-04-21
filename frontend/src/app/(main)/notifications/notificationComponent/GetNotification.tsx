"use client"
import { useGetNotifications } from "@/hooks/useNotification"
import NotificationMessage from "./NotificationMessage"
import Notification from "@/components/skeletons/Notification"
import NoNotification from "./NoNotification"

const GetNotification = () => {
  const { data, isLoading, error } = useGetNotifications()
  return (
    <div>
      {isLoading ? (
        Array.from({ length: 10 }).map((_, i) => <Notification key={i} />)
      ) : error ? (
        <div className="text-center py-4 text-red-500">
          Failed to load notifications
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
