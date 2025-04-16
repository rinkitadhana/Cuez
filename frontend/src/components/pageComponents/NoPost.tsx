"use client"

import { FileQuestion } from "lucide-react"

const NoPost = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400">
      <div className="relative mb-6">
        <FileQuestion className="w-16 h-16 animate-pulse" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-zinc-700 rounded-full" />
      </div>
      <h3 className="text-xl font-medium mb-2">No post found</h3>
      <p className="text-sm text-zinc-500">
        The post you&apos;re looking for might have been deleted or doesn&apos;t
        exist
      </p>
    </div>
  )
}

export default NoPost
