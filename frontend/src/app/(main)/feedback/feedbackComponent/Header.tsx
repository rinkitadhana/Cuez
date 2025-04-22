"use client"
import { useGetMe } from "@/hooks/useAuth"
import { useGetUserProfile } from "@/hooks/useUser"
import { ArrowLeft, PencilLine } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
const Header = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="flex sticky top-0 z-50 bg-bgClr items-center justify-between border-b border-zinc-700 px-4 py-2.5">
      <div className=" flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-zinc-800 rounded-xl w-fit cursor-pointer opacity-95"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold">Feedbacks</h1>
      </div>
    </div>
  )
}

export default Header
