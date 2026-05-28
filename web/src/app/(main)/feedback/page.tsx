import React from "react"
import Header from "./feedbackComponent/Header"
import MainWrapper from "@/layout/MainWrapper"
import GetFeedbacks from "./feedbackComponent/GetFeedbacks"
import PageHead from "@/components/pageComponents/PageHead"
const page = () => {
  return (
    <MainWrapper>
      <PageHead title="Feedback / Cuez" />
      <Header />
      <GetFeedbacks />
    </MainWrapper>
  )
}

export default page
