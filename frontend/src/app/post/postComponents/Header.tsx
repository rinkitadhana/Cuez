"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const Header = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="flex w-full select-none items-center border-b py-2 border-zinc-700 sticky top-0 bg-bgClr px-4 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-zinc-800 rounded-xl w-fit cursor-pointer opacity-95"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold opacity-95">Post</h1>
      </div>
    </div>
  )
}

export default Header
