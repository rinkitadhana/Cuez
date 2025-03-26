"use client"
import { SearchBox } from "@/components/pageComponents/SearchBox"
import { usePathname } from "next/navigation"
import SuggestedUsers from "@/components/pageComponents/SuggestedUsers"
import FeedbackForm from "@/components/FeedbackForm"
import BetaNotification from "@/components/pageComponents/BetaNotification"
import Contribute from "@/components/pageComponents/Contribute"
const RightSidebar = () => {
  const pathname = usePathname()
  return (
    <section className="flex flex-col gap-4 my-4 h-screen">
      {!pathname.includes("/search") && <SearchBox />}
      <BetaNotification />
      <SuggestedUsers />
      <FeedbackForm />
      <Contribute />
    </section>
  )
}

export default RightSidebar
