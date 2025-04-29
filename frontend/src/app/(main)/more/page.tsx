import MainWrapper from "@/layout/MainWrapper"
import RightSidebar from "@/layout/sidebars/RightSidebar"
import React from "react"
import Header from "./MoreComponents/Header"
const page = () => {
  return (
    <MainWrapper>
      <Header />
      <div className="px-4">
        <RightSidebar />
      </div>
    </MainWrapper>
  )
}

export default page
