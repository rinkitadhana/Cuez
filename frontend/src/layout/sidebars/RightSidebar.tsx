"use client"
import { SearchBox } from "@/components/pageComponents/SearchBox"
import { usePathname } from "next/navigation"
import SuggestedUsers from "@/components/pageComponents/SuggestedUsers"
import FeedbackForm from "@/components/FeedbackForm"

const RightSidebar = () => {
  const pathname = usePathname()
  return (
    <section className="flex flex-col gap-4 my-4 h-screen">
      {!pathname.includes("/search") && <SearchBox />}
      <SuggestedUsers />
      <div className="border rounded-xl border-zinc-700 p-4">
        <FeedbackForm />
      </div>
    </section>
  )
}

export default RightSidebar
