"use client"
import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"
import { Comment } from "@/types/Comment"

interface CommentStructureProps {
  comment: Comment
}

const CommentStructure = ({ comment }: CommentStructureProps) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const formatDate = (date: Date) => {
    const now = new Date()
    const postDate = new Date(date)
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000
    )
    if (diffInSeconds < 60) return `${diffInSeconds}s`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    return `${Math.floor(diffInSeconds / 86400)}d`
  }

  return (
    <section className="flex relative flex-col gap-4 p-4 border-b border-zinc-700  transition-all duration-200">
      <div className="flex gap-2 w-full">
        <Image
          src={comment?.user?.profileImg || "/img/pfp/default.webp"}
          alt="user avatar"
          width={32}
          height={32}
          className="rounded-lg size-10 select-none"
        />
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col -space-y-1">
                <div className="flex gap-2 items-center">
                  <h1 className="font-semibold">
                    {comment?.user?.fullName || "Deleted User"}
                  </h1>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-sm text-zinc-400">
                    @{comment?.user?.username || "DeletedUser"}
                  </p>
                  <div className="text-sm text-zinc-400">
                    <span> {" • "}</span>
                    <span>{formatDate(new Date(comment?.createdAt))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div>{comment.text}</div>
            {comment.img && (
              <div
                onClick={() => setIsImageModalOpen(true)}
                className="cursor-pointer"
              >
                <Image
                  src={comment.img}
                  alt="Post image"
                  width={500}
                  height={500}
                  className="rounded-lg w-full"
                />
              </div>
            )}
            {comment.video && (
              <div>
                <video
                  src={comment.video}
                  controls
                  className="rounded-lg w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-bgClr/50 backdrop-blur-sm flex justify-center items-center z-[10000]">
          <Image
            src={comment.img || ""}
            alt="Post image"
            width={1920}
            height={1080}
            className="rounded-lg max-w-full max-h-full object-contain"
          />
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:bg-zinc-700/50 rounded-xl p-2 transition-all duration-200"
          >
            <X />
          </button>
        </div>
      )}
    </section>
  )
}

export default CommentStructure
