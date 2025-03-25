"use client"

import { Hash } from "lucide-react"
import { useState } from "react"

const HomeHeader = () => {
  const [activeTab, setActiveTab] = useState("NEWEST")

  return (
    <div className="flex w-full justify-between items-center border-b border-zinc-700 sticky top-0 bg-bgClr px-6">
      <p className="font-semibold opacity-95">Scroll</p>
      <div className="flex items-center border border-zinc-700  rounded-xl my-2.5">
        <div
          onClick={() => setActiveTab("NEWEST")}
          className={`flex flex-1 justify-center items-center text-xs rounded-l-xl font-semibold px-3 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "NEWEST"
              ? "text-blue-500"
              : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          NEWEST
        </div>
        <div
          onClick={() => setActiveTab("TRENDING")}
          className={`flex flex-1 justify-center items-center text-xs border-x border-zinc-700 font-semibold px-3 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "TRENDING"
              ? "text-blue-500"
              : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          TRENDING
        </div>
        <div
          onClick={() => setActiveTab("FOLLOWING")}
          className={`flex flex-1 justify-center items-center text-xs rounded-r-xl font-semibold px-3 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "FOLLOWING"
              ? "text-blue-500"
              : "text-zinc-400 hover:bg-zinc-800"
          }`}
        >
          FOLLOWING
        </div>
      </div>

      <div className="p-2 hover:bg-zinc-800 rounded-xl cursor-pointer opacity-95">
        <Hash size={20} />
      </div>
    </div>
  )
}

export default HomeHeader
