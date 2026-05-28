import React from "react"
import PostSkeleton from "./PostSkeleton"

const ProfileSkeleton = () => {
  return (
    <div>
      <div className="rounded-xl relative mb-[60px]">
        <div className="w-full h-[200px] bg-zinc-800 animate-pulse" />
        <div className="absolute -bottom-[60px] left-5 size-[120px] rounded-xl bg-zinc-800 animate-pulse" />
        <div className="absolute -bottom-[50px] right-5 w-24 h-8 bg-zinc-800 animate-pulse rounded-xl" />
      </div>

      <div className="px-5 py-3 flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <div className="h-7 w-48 bg-zinc-800 animate-pulse rounded-lg" />
          <div className="h-4 w-32 bg-zinc-800 animate-pulse rounded-lg" />
        </div>

        <div className="h-4 w-3/4 bg-zinc-800 animate-pulse rounded-lg mt-1" />

        <div className="flex gap-3 items-center mt-1">
          <div className="h-4 w-32 bg-zinc-800 animate-pulse rounded-lg" />
          <div className="h-4 w-32 bg-zinc-800 animate-pulse rounded-lg" />
          <div className="h-4 w-32 bg-zinc-800 animate-pulse rounded-lg" />
        </div>

        <div className="flex gap-4 items-center mt-1">
          <div className="h-4 w-24 bg-zinc-800 animate-pulse rounded-lg" />
          <div className="h-4 w-24 bg-zinc-800 animate-pulse rounded-lg" />
        </div>
      </div>

      <div className="flex items-center justify-center mt-3 py-2.5 border-b border-zinc-700">
        <div className="flex items-center rounded-xl w-fits">
          <div className="w-20 h-7 bg-zinc-800 animate-pulse rounded-l-xl" />
          <div className="w-20 h-7 bg-zinc-800 animate-pulse rounded-r-xl" />
        </div>
      </div>

      <div className="mt-4 px-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export default ProfileSkeleton
