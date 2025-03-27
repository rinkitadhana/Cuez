"use client"
import { MdDeleteOutline } from "react-icons/md"
import { useState } from "react"

const Header = () => {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="flex w-full select-none justify-between items-center border-b py-2.5 border-zinc-700 sticky top-0 bg-bgClr px-6 z-10">
      <h1 className="font-semibold opacity-95">Notifications</h1>
      <div className="flex items-center gap-2 relative">
        <div
          className="p-2 hover:bg-zinc-800 rounded-xl cursor-pointer opacity-95"
          onMouseEnter={() => setShowConfirm(true)}
          onMouseLeave={() => setShowConfirm(false)}
          onClick={() => {
            // Handle delete all notifications
          }}
        >
          <MdDeleteOutline className="text-xl" />
          {showConfirm && (
            <div className="absolute right-0 top-full mt-4 bg-zinc-800 text-sm text-white py-2 px-4 rounded-lg whitespace-nowrap">
              Clear all notifications
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
