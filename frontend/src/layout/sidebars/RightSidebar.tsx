"use client"
import { SearchBox } from "@/components/pageComponents/SearchBox"
import { usePathname } from "next/navigation"
import SuggestedUsers from "@/components/pageComponents/SuggestedUsers"
const RightSidebar = () => {
  const pathname = usePathname()
  return (
    <section className="flex flex-col gap-4 my-4 h-screen">
      {!pathname.includes("/search") && <SearchBox />}
      <SuggestedUsers />
    </section>
  )
}

export default RightSidebar
