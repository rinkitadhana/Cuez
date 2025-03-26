"use client"
import Image from "next/image"
import { useState } from "react"
import { BiImage } from "react-icons/bi"
import { HiOutlineEmojiHappy } from "react-icons/hi"
import { IoLocationOutline } from "react-icons/io5"
import { MdOutlineGifBox } from "react-icons/md"
import { RiFileListLine } from "react-icons/ri"
import { TbCalendarTime } from "react-icons/tb"

const CreatePost = () => {
  const [postContent, setPostContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post submission here
    console.log("Post content:", postContent)
    setPostContent("")
  }

  return (
    <section className="flex flex-col gap-4 p-4 border-b border-zinc-700">
      <div className="flex gap-2">
        <Image
          src="/img/pfp/Gruz.jpeg"
          alt="profile"
          width={32}
          height={32}
          className="rounded-lg size-10 select-none"
        />
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full bg-transparent border-none outline-none resize-none text-lg placeholder:text-zinc-500"
              rows={3}
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-4 text-blue-500">
                <div className="p-2 hover:bg-blue-500/30 rounded-full transition-all duration-200 cursor-pointer">
                  <BiImage className="text-xl" />
                </div>
                <div className="p-2 hover:bg-blue-500/30 rounded-full transition-all duration-200 cursor-pointer">
                  <MdOutlineGifBox className="text-xl" />
                </div>
                <div className="p-2 hover:bg-blue-500/30 rounded-full transition-all duration-200 cursor-pointer">
                  <RiFileListLine className="text-xl" />
                </div>
                <div className="p-2 hover:bg-blue-500/30 rounded-full transition-all duration-200 cursor-pointer">
                  <HiOutlineEmojiHappy className="text-xl" />
                </div>
                <div className="p-2 hover:bg-blue-500/30 rounded-full transition-all duration-200 cursor-pointer">
                  <TbCalendarTime className="text-xl" />
                </div>
                <div className="p-2 hover:bg-blue-500/30 rounded-full transition-all duration-200 cursor-pointer">
                  <IoLocationOutline className="text-xl" />
                </div>
              </div>
              <button
                type="submit"
                disabled={!postContent.trim()}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreatePost
