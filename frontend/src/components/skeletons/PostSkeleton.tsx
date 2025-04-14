import React from "react"

const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 border-b border-zinc-700 animate-pulse">
      <div className="flex gap-2 w-full">
        <div className="rounded-lg bg-zinc-700 size-10" />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-zinc-700 rounded-lg" />
              <div className="h-3 w-24 bg-zinc-700 rounded-lg" />
            </div>
            <div className="h-8 w-8 bg-zinc-700 rounded-lg" />
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-zinc-700 rounded-lg" />
              <div className="h-4 w-1/2 bg-zinc-700 rounded-lg" />
            </div>

            <div className="h-64 w-full bg-zinc-700 rounded-lg" />

            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="h-6 w-12 bg-zinc-700 rounded-lg" />
                <div className="h-6 w-12 bg-zinc-700 rounded-lg" />
                <div className="h-6 w-12 bg-zinc-700 rounded-lg" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-6 bg-zinc-700 rounded-lg" />
                <div className="h-6 w-6 bg-zinc-700 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostSkeleton
