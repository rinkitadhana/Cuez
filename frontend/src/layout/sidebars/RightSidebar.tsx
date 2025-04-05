"use client"
import { SearchBox } from "@/components/pageComponents/SearchBox"
import { usePathname } from "next/navigation"
import SuggestedUsers from "@/components/pageComponents/SuggestedUsers"
import FeedbackForm from "@/components/FeedbackForm"
import BetaNotification from "@/components/pageComponents/BetaNotification"
import GithubStar from "@/components/pageComponents/GithubStar"
import Offer from "@/components/pageComponents/Offer"
const RightSidebar = () => {
  const pathname = usePathname()
  return (
    <section className="flex flex-col gap-4 my-4 w-full">
      {!pathname.includes("/search") && <SearchBox />}
      <BetaNotification />
      <SuggestedUsers />
      <Offer/>
      <FeedbackForm />
      <GithubStar />
    </section>
  )
}

export default RightSidebar
