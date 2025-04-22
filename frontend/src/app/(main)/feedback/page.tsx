import React from "react"
import Header from "./feedbackComponent/Header"
import MainWrapper from "@/layout/MainWrapper"
import GetFeedbacks from "./feedbackComponent/GetFeedbacks"
const page = () => {
  return (
    <MainWrapper>
      <Header />
      <GetFeedbacks />
    </MainWrapper>
  )
}

export default page
