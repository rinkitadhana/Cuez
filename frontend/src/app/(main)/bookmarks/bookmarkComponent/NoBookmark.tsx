import { Bookmark } from "lucide-react"

const NoBookmark = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400">
      <div className="relative mb-6">
        <Bookmark className="w-16 h-16 animate-pulse" />
      </div>
      <h3 className="text-xl font-medium mb-2">No bookmarks yet</h3>
      <p className="text-sm text-zinc-500">
        When you bookmark posts, they&apos;ll appear here
      </p>
    </div>
  )
}

export default NoBookmark
