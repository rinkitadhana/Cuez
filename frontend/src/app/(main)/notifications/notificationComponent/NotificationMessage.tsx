"use client"
import { Notification } from "@/types/Notification"

import Image from "next/image"
import { MdDeleteOutline } from "react-icons/md"

const NotificationMessage = ({
  notification,
}: {
  notification: Notification
}) => {
  const getNotificationIcon = () => {
    switch (notification.type) {
      case "follow":
        return (
          <div className="absolute -right-1 -bottom-1 bg-mainclr p-1 rounded-full">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M19 8v6" />
              <path d="M16 11h6" />
            </svg>
          </div>
        )
      case "like":
        return (
          <div className="absolute -right-1 -bottom-1 bg-red-500 p-1 rounded-full">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        )
      case "repost":
        return (
          <div className="absolute -right-1 -bottom-1 bg-green-500 p-1 rounded-full">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 1l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 23l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
          </div>
        )
      case "reply":
        return (
          <div className="absolute -right-1 -bottom-1 bg-blue-500 p-1 rounded-full">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  const getNotificationText = () => {
    switch (notification.type) {
      case "follow":
        return "followed you"
      case "like":
        return "liked your post"
      case "repost":
        return "reposted your post"
      case "reply":
        return "replied to your post"
      default:
        return ""
    }
  }

  return (
    <div
      className={`flex px-6 py-4 border-b border-zinc-700 hover:bg-zinc-900 transition-all duration-200 cursor-pointer group ${
        !notification.read ? "bg-zinc-900/40" : ""
      }`}
    >
      <div className="relative mr-4">
        <Image
          src={notification.from.profileImg || "/img/pfp/default.webp"}
          alt={`${notification.from.fullName}'s profile picture`}
          width={48}
          height={48}
          className="rounded-xl"
        />
        {getNotificationIcon()}
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <span className="font-bold hover:underline">
              {notification.from.fullName || "Deleted User"}
            </span>
            <span className="text-zinc-400 ml-1">{getNotificationText()}</span>
            <span className="text-zinc-500 ml-2 text-sm">
              {notification.createdAt}
            </span>
          </div>
        </div>
        {notification.post && (
          <p className="text-zinc-400 mt-1 text-sm line-clamp-2">
            {notification.post.text}
          </p>
        )}
      </div>
      <div
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-zinc-800 rounded-xl cursor-pointer self-center ml-2"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <MdDeleteOutline className="text-xl" />
      </div>
    </div>
  )
}

export default NotificationMessage
