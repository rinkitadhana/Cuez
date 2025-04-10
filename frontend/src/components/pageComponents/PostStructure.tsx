"use client"
import Image from "next/image"
import { BiCommentDetail, BiUpvote } from "react-icons/bi"
import { HiArrowPathRoundedSquare } from "react-icons/hi2"
import { IoBookmarkOutline } from "react-icons/io5"
import { RiShareBoxFill } from "react-icons/ri"
import { SlOptions } from "react-icons/sl"
import { useEffect, useRef, useState } from "react"
import { Post } from "@/types/Post"
import { useGetMe } from "@/hooks/useAuth"
import { useDeletePost } from "@/hooks/usePost"
import { Loader2 } from "lucide-react"
interface PostStructureProps {
  post: Post
}

const PostStructure = ({ post }: PostStructureProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [showWarning, setShowWarning] = useState(false)
  const warningRef = useRef<HTMLDivElement>(null)
  const postRef = useRef<HTMLElement>(null)
  const { data: authUser } = useGetMe()
  const { mutate: deletePost, isPending } = useDeletePost()
  const isOwner = authUser?.user._id === post.user._id

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !event.composedPath().includes(menuRef.current)
      ) {
        setIsOpen(false)
      }

      if (
        showWarning &&
        warningRef.current &&
        !warningRef.current.contains(event.target as Node) &&
        !event.composedPath().includes(warningRef.current)
      ) {
        setShowWarning(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showWarning])

  const handleDeletePost = () => {
    deletePost(post._id, {
      onSuccess: () => {
        setIsOpen(false)
        setShowWarning(false)
      },
      onError: () => {
        setShowWarning(false)
      },
    })
  }

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
    <section
      ref={postRef}
      className="flex relative flex-col gap-4 p-4 border-b border-zinc-700 hover:bg-zinc-900 transition-all duration-200 cursor-pointer"
    >
      <div className="flex gap-2 w-full">
        <Image
          src={post.user.profileImg}
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
                  <h1 className="font-semibold">{post.user.fullName}</h1>
                  <div className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer">
                    Follow
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-sm text-zinc-400">@{post.user.username}</p>
                  <div className="text-sm text-zinc-400">
                    <span> {" • "}</span>
                    <span>{formatDate(new Date(post.createdAt))}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="select-none" ref={menuRef}>
              {isOwner && (
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(!isOpen)
                  }}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    isOpen ? "bg-zinc-700" : "hover:bg-zinc-700"
                  }`}
                >
                  <SlOptions />
                </div>
              )}
              {isOpen && (
                <div className="absolute flex flex-col items-start gap-0.5 top-14 right-5 bg-zinc-900 z-10 border border-zinc-700 p-2 w-32 rounded-lg">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="py-1 px-3 text-left hover:bg-zinc-700 rounded-lg transition-all duration-200 w-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowWarning(true)
                    }}
                    type="button"
                    className="py-1 px-3 text-left hover:bg-zinc-700 rounded-lg transition-all duration-200 w-full"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div>{post?.text}</div>
            {post?.img && (
              <div>
                <Image
                  src={post?.img}
                  alt="Post image"
                  width={500}
                  height={500}
                  className="rounded-lg w-full"
                />
              </div>
            )}
            {post?.video && (
              <div>
                <video
                  src={post?.video}
                  controls
                  className="rounded-lg w-full"
                />
              </div>
            )}
            <div className="flex justify-between text-lg select-none">
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-1 p-1.5 hover:bg-blue-500/30 rounded-lg transition-all duration-200">
                  <BiCommentDetail />
                  {post?.comments.length > 0 && (
                    <span className="text-sm">{post?.comments.length}</span>
                  )}
                </div>
                <div className="p-1.5 hover:bg-green-500/30 rounded-lg transition-all duration-200">
                  <HiArrowPathRoundedSquare />
                </div>
                <div className="flex items-center gap-1 p-1.5 hover:bg-red-500/30 rounded-lg transition-all duration-200">
                  <BiUpvote />
                  {post?.likes.length > 0 && (
                    <span className="text-sm">{post?.likes.length}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <div className="p-1.5 hover:bg-blue-500/30 rounded-lg transition-all duration-200">
                  <IoBookmarkOutline />
                </div>
                <div className="p-1.5 hover:bg-green-500/30 rounded-lg transition-all duration-200">
                  <RiShareBoxFill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showWarning && (
        <div
          className="fixed inset-0 bg-bgClr/50 backdrop-blur-sm flex justify-center items-center z-[10000]"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            ref={warningRef}
            className="bg-bgClr border border-zinc-700 w-full max-w-[400px] rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Delete post?</h2>
            <p className="text-zinc-400 mb-6">
              You are about to delete this post. Are you sure you want to
              proceed?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowWarning(false)
                }}
                className="px-4 py-1.5 rounded-xl font-semibold hover:bg-zinc-800 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeletePost()
                }}
                className="px-4 py-1.5 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PostStructure
