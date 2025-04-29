"use client"

import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useGetFeedbacks } from "@/hooks/useFeedback"
const Header = () => {
  const router = useRouter()
  const { data: feedbacks, isLoading } = useGetFeedbacks()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="flex sticky top-0 z-50 bg-bgClr items-center justify-between border-b border-zinc-700 h-[60px] px-4">
      <div className=" flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-zinc-800 rounded-xl w-fit cursor-pointer opacity-95"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-semibold">Feedbacks</h1>
      </div>
      <div className="border border-zinc-700 text-zinc-200 bg-zinc-800 rounded-xl px-4 py-1">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          `${feedbacks?.feedbacks?.length} Feedbacks`
        )}
      </div>
    </div>
  )
}

export default Header
