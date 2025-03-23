"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from "react"
import { BiChat, BiSolidChat } from "react-icons/bi"
import { BsBell, BsBellFill } from "react-icons/bs"
import { FaRegUser, FaUser } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"
import {
  IoBookmarks,
  IoBookmarksOutline,
  IoFolderOpen,
  IoFolderOpenOutline,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5"
import { LuLogOut } from "react-icons/lu"
import { MdChatBubble, MdChatBubbleOutline } from "react-icons/md"
import {
  RiHome2Fill,
  RiHome2Line,
  RiSearchFill,
  RiSearchLine,
} from "react-icons/ri"

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex flex-col gap-2 py-5 max-w-[200px] w-full select-none">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-2 py-2 px-4 select-none border rounded-2xl border-zinc-700 hover:border-zinc-500 transition-colors duration-300 "
      >
        <Image
          src="/img/pfp/Gruz.jpeg"
          alt="logo"
          width={30}
          height={30}
          className="rounded-full size-10"
        />
        <div>
          <h1 className=" font-semibold">Gruz</h1>
          <p className="text-xs text-zinc-400">@damnGruz</p>
        </div>
      </div>

      {isOpen && (
        <div className="cursor-pointer flex flex-col gap-1 p-2 select-none border rounded-2xl border-zinc-700 hover:border-zinc-500 transition-colors duration-300 ">
          <div className="font-medium flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-blue-500/20 transition-colors duration-200">
            <IoMdAdd className="text-xl" />
            Add account
          </div>
          <div className="font-medium flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-red-500/20  transition-colors duration-200">
            <LuLogOut className="text-xl" />
            Logout
          </div>
        </div>
      )}
      <nav className="flex flex-col gap-1 p-2  select-none border rounded-2xl border-zinc-700 hover:border-zinc-500 transition-colors duration-300">
        <Link href="/home" className="nav-btn">
          {pathname === "/home" ? (
            <RiHome2Fill className="text-xl" />
          ) : (
            <RiHome2Line className="text-xl" />
          )}
          Home
        </Link>
        <Link href="/search" className="nav-btn">
          {pathname === "/search" ? (
            <RiSearchFill className="text-xl" />
          ) : (
            <RiSearchLine className="text-xl" />
          )}
          Search
        </Link>

        <Link href="/projects" className="nav-btn">
          {pathname === "/projects" ? (
            <IoFolderOpen className="text-xl" />
          ) : (
            <IoFolderOpenOutline className="text-xl" />
          )}
          Projects
        </Link>

        <Link href="/discussions" className="nav-btn">
          {pathname === "/discussions" ? (
            <BiSolidChat className="text-xl" />
          ) : (
            <BiChat className="text-xl" />
          )}
          Disscussions
        </Link>

        <Link href="/notifications" className="nav-btn">
          {pathname === "/notifications" ? (
            <BsBellFill className="text-xl" />
          ) : (
            <BsBell className="text-xl" />
          )}
          Notifications
        </Link>
        <Link href="/chat" className="nav-btn">
          {pathname === "/chat" ? (
            <MdChatBubble className="text-xl" />
          ) : (
            <MdChatBubbleOutline className="text-xl" />
          )}
          Chat
        </Link>
        <Link href="/bookmarks" className="nav-btn">
          {pathname === "/bookmarks" ? (
            <IoBookmarks className="text-xl" />
          ) : (
            <IoBookmarksOutline className="text-xl" />
          )}
          Bookmarks
        </Link>
        <Link href="/profile" className="nav-btn">
          {pathname === "/profile" ? (
            <FaUser className="text-xl" />
          ) : (
            <FaRegUser className="text-xl" />
          )}
          Profile
        </Link>
        <Link href="/settings" className="nav-btn">
          {pathname === "/settings" ? (
            <IoSettingsSharp className="text-xl" />
          ) : (
            <IoSettingsOutline className="text-xl" />
          )}
          Settings
        </Link>
      </nav>
      <a
        className={`font-medium cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200 bg-mainclr hover:bg-mainclr/80 text-white justify-center mt-6`}
      >
        Post
      </a>
    </div>
  )
}

export default Navbar
