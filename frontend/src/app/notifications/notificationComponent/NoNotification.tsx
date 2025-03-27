import { Bell } from "lucide-react"

const NoNotification = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400">
      <div className="relative mb-6">
        <Bell className="w-16 h-16 animate-pulse" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-zinc-700 rounded-full" />
      </div>
      <h3 className="text-xl font-medium mb-2">No notifications yet</h3>
      <p className="text-sm text-zinc-500">
        When you receive notifications, they'll appear here
      </p>
    </div>
  )
}

export default NoNotification
