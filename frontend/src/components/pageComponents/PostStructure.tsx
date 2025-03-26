"use client"
import Image from "next/image"
import { BiCommentDetail, BiUpvote } from "react-icons/bi"
import { HiArrowPathRoundedSquare } from "react-icons/hi2"
import { IoBookmarkOutline } from "react-icons/io5"
import { RiShareBoxFill } from "react-icons/ri"
import { SlOptions } from "react-icons/sl"
import { useEffect, useRef, useState } from "react"
const PostStructure = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  return (
    <section className="flex relative flex-col gap-4 p-4 border-b border-zinc-700 hover:bg-zinc-900 transition-all duration-200 cursor-pointer">
      <div className="flex gap-2">
        <Image
          src="/img/pfp/Gruz.jpeg"
          alt="logo"
          width={32}
          height={32}
          className="rounded-lg size-10 select-none"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col -space-y-1">
                <div className="flex gap-2 items-center">
                  <h1 className="font-semibold">Gruz</h1>
                  <div className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer">
                    Follow
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-sm text-zinc-400">@damnGruz</p>
                  <div className="text-sm text-zinc-400">
                    <span> {" • "}</span>
                    <span>2h</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="select-none" ref={menuRef}>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`p-1.5 rounded-lg transition-all duration-200 ${
                  isOpen ? "bg-zinc-700" : "hover:bg-zinc-700"
                }`}
              >
                <SlOptions />
              </div>
              {isOpen && (
                <div className="absolute flex flex-col gap-0.5 top-14 right-5 bg-zinc-900 border border-zinc-700 p-2 w-32 rounded-lg">
                  <div className="py-1 px-3 hover:bg-zinc-700 rounded-lg transition-all duration-200">
                    Edit
                  </div>
                  <div className="py-1 px-3 hover:bg-zinc-700 rounded-lg transition-all duration-200">
                    Delete
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
              dolorem incidunt, vel sapiente maiores nemo nostrum quaerat aut
              unde ducimus dignissimos aspernatur.
            </div>
            <div className="flex justify-between text-lg select-none">
              <div className="flex gap-3 items-center">
                <div className="p-1.5 hover:bg-blue-500/30 rounded-lg transition-all duration-200">
                  <BiCommentDetail />
                </div>
                <div className="p-1.5 hover:bg-green-500/30 rounded-lg transition-all duration-200">
                  <HiArrowPathRoundedSquare />
                </div>
                <div className="p-1.5 hover:bg-red-500/30 rounded-lg transition-all duration-200">
                  <BiUpvote />
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
    </section>
  )
}

export default PostStructure
