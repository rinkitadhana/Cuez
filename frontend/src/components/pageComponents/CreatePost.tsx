"use client"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { BiImage } from "react-icons/bi"
import { HiOutlineEmojiHappy } from "react-icons/hi"
import { IoLocationOutline } from "react-icons/io5"
import { MdOutlineGifBox } from "react-icons/md"
import { RiFileListLine } from "react-icons/ri"
import { TbCalendarTime } from "react-icons/tb"

const CreatePost = () => {
  const [postContent, setPostContent] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle post submission here
    console.log("Post content:", postContent)
    setPostContent("")
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 py-2 rounded-xl bg-mainclr text-white font-semibold hover:bg-mainclr/80 transition-all duration-200"
      >
        Create a post
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-bgClr/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-bgClr border border-zinc-700 w-full max-w-[600px] rounded-xl p-4">
            <section className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Image
                  src="/img/pfp/Gruz.jpeg"
                  alt="profile"
                  width={32}
                  height={32}
                  className="rounded-lg size-9 select-none"
                />
                  <div className="flex gap-2 items-center ">
                        <button
                          type="submit"
                          disabled={!postContent.trim()}
                          className="px-4 py-1 bg-mainclr text-white font-semibold rounded-xl hover:bg-mainclr/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Post
                        </button>
                      </div>
                </div>
                <div className="flex-1">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="What's happening?"
                      className="w-full bg-transparent border-none outline-none resize-none text-lg placeholder:text-zinc-500"
                      rows={3}
                      autoFocus
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
                      
                    </div>
                  </form>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost
