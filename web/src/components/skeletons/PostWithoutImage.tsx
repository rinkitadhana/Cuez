const CommentSkeleton = () => {
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
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-zinc-700 rounded-lg" />
              <div className="h-4 w-1/2 bg-zinc-700 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentSkeleton
