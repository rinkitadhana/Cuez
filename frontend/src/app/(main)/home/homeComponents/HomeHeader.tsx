"use client"

import BelowTip from "@/components/infoTips/BelowTip"
import MenuButton from "@/layout/MenuButton"
import useFeedTypeStore from "@/store/FeedTypeStore"
import { Hash } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const HomeHeader = () => {
  const [activeTab, setActiveTab] = useState("All")
  const { setFeedType } = useFeedTypeStore()
  useEffect(() => {
    setFeedType(activeTab)
  }, [activeTab, setFeedType])

  return (
    <div className="flex w-full select-none justify-between items-center border-b border-zinc-700 sticky top-0 bg-bgClr h-[60px] px-4 z-10">
      <p className="font-semibold opacity-95 hidden md:block">Scroll</p>
      <MenuButton />
      <div className="flex items-center border border-zinc-700  rounded-xl my-2.5">
        <div
          onClick={() => setActiveTab("All")}
          className={`flex flex-1 justify-center items-center text-xs rounded-l-xl font-semibold px-3 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "All" ? "bg-zinc-800" : "hover:bg-zinc-800"
          }`}
        >
          Newest
        </div>
        <div
          onClick={() => setActiveTab("Trending")}
          className={`flex flex-1 justify-center items-center text-xs border-x border-zinc-700 font-semibold px-3 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "Trending" ? "bg-zinc-800" : "hover:bg-zinc-800"
          }`}
        >
          Trending
        </div>
        <div
          onClick={() => setActiveTab("Following")}
          className={`flex flex-1 justify-center items-center text-xs rounded-r-xl font-semibold px-3 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "Following" ? "bg-zinc-800" : "hover:bg-zinc-800"
          }`}
        >
          Following
        </div>
      </div>
      <BelowTip text="Feedbacks">
        <Link href="/feedback">
          <div className="p-2 hover:bg-zinc-800 rounded-xl w-fit cursor-pointer opacity-95">
            <Hash size={20} />
          </div>
        </Link>
      </BelowTip>
    </div>
  )
}

export default HomeHeader
