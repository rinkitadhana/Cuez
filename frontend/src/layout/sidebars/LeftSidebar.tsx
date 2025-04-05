"use client"

import CreatePost from "@/components/pageComponents/CreatePost"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState, useEffect, useRef } from "react"
import { BiChat, BiSolidChat } from "react-icons/bi"
import { BsBell, BsBellFill } from "react-icons/bs"
import { FaRegUser, FaUser } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"
import { useLogout, useGetMe } from "@/hooks/useAuth"
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
import { SlOptions } from "react-icons/sl"

const LeftSidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { mutate: logout } = useLogout()
  const { data: me } = useGetMe()

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const links = [
    {
      href: "/home",
      label: "Home",
      icon: {
        filled: <RiHome2Fill className="text-xl" />,
        outline: <RiHome2Line className="text-xl" />,
      },
    },
    {
      href: "/search",
      label: "Search",
      icon: {
        filled: <RiSearchFill className="text-xl" />,
        outline: <RiSearchLine className="text-xl" />,
      },
    },
    {
      href: "/projects",
      label: "Projects",
      icon: {
        filled: <IoFolderOpen className="text-xl" />,
        outline: <IoFolderOpenOutline className="text-xl" />,
      },
    },
    {
      href: "/discussions",
      label: "Discussions",
      icon: {
        filled: <BiSolidChat className="text-xl" />,
        outline: <BiChat className="text-xl" />,
      },
    },
    {
      href: "/notifications",
      label: "Notifications",
      icon: {
        filled: <BsBellFill className="text-xl" />,
        outline: <BsBell className="text-xl" />,
      },
    },
    {
      href: "/chat",
      label: "Chat",
      icon: {
        filled: <MdChatBubble className="text-xl" />,
        outline: <MdChatBubbleOutline className="text-xl" />,
      },
    },
    {
      href: "/bookmarks",
      label: "Bookmarks",
      icon: {
        filled: <IoBookmarks className="text-xl" />,
        outline: <IoBookmarksOutline className="text-xl" />,
      },
    },
    {
      href: "/profile",
      label: "Profile",
      icon: {
        filled: <FaUser className="text-xl" />,
        outline: <FaRegUser className="text-xl" />,
      },
    },
    {
      href: "/settings",
      label: "Settings",
      icon: {
        filled: <IoSettingsSharp className="text-xl" />,
        outline: <IoSettingsOutline className="text-xl" />,
      },
    },
  ]

  return (
    <div className="w-full flex flex-col justify-between py-4 select-none h-screen">
      <div className="flex flex-col gap-3">
        <div className="relative" ref={menuRef}>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={` flex cursor-pointer items-center justify-between gap-2 w-full -ml-1  rounded-2xl group/pfp  transition-all duration-200 py-2 px-2 select-none      
              ${isOpen ? "bg-zinc-800 ml-0" : "hover:ml-0 hover:bg-zinc-800"}`}
          >
            <div className="flex items-center gap-3  ">
              <Image
                src={me?.user.profileImg || "/img/pfp/Gruz.jpeg"}
                alt="Profile picture"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <div
                className={`opacity-0  transition-all duration-200 ${
                  isOpen ? "opacity-100" : "group-hover/pfp:opacity-100"
                }`}
              >
                <h1 className="font-semibold text-sm truncate">
                  {me?.user.fullName}
                </h1>
                <p className="text-xs text-zinc-400 truncate">@{me?.user.username}</p>
              </div>
            </div>
            <SlOptions
              className={`opacity-0 ${
                isOpen ? "opacity-80" : "group-hover/pfp:opacity-80"
              } transition-all duration-200`}
            />
          </div>

          {isOpen && (
            <div className="absolute top-16 left-0 w-full bg-zinc-800 cursor-pointer flex flex-col gap-1 p-2 select-none rounded-2xl">
              <Link
                href="/login"
                className="font-semibold flex items-center gap-2 px-2.5 py-2.5 rounded-xl hover:bg-zinc-500/20 transition-colors duration-200"
              >
                <IoMdAdd className=" text-xl" />
                <p className="text-sm">Add account</p>
              </Link>
              <button
                onClick={handleLogout}
                className="font-semibold flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-zinc-500/20 transition-colors duration-200"
              >
                <LuLogOut className="" />
                <p className="text-sm">Logout</p>
              </button>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1 select-none">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium flex items-center gap-2 py-2.5 group/nav-link"
              style={{ fontWeight: pathname === link.href ? "600" : "normal" }}
            >
              {pathname === link.href ? link.icon.filled : link.icon.outline}
              <span className="group-hover/nav-link:ml-1.5 transition-all duration-200">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        <CreatePost />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image
            src="/img/icon/cuez-logo.png"
            alt="Cuez Logo"
            width={32}
            height={32}
            className="size-9"
          />
          <div className="flex flex-col gap-0">
            <span className="font-bold text-2xl bg-mainclr bg-clip-text text-transparent">
              Cuez
            </span>
            <p className="text-xs text-zinc-300 -mt-1">for everyone.</p>
          </div>
        </div>
        <div className="flex gap-1 items-center text-xs text-zinc-400">
          <a
            href="https://x.com/damnGruz"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:underline hover:text-zinc-100 transition-opacity duration-200"
          >
            Support
          </a>
          {" • "}
          <a
            href="mailto:therinkit@gmail.com"
            className="cursor-pointer hover:underline hover:text-zinc-100 transition-opacity duration-200"
          >
            Help
          </a>
          {" • "}
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:underline hover:text-zinc-100 transition-opacity duration-200"
          >
            Legal
          </a>
          {" • "}
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:underline hover:text-zinc-100 transition-opacity duration-200"
          >
            Terms
          </a>
        </div>
        <p className="text-xs text-zinc-300 mt-0.5">
          © Cuez 2025, All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default LeftSidebar
