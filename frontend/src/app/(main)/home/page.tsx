"use client"
import MainWrapper from "@/layout/MainWrapper"
import HomeHeader from "./homeComponents/HomeHeader"
import GetPosts from "./homeComponents/GetPosts"
import PageHead from "@/components/pageComponents/PageHead"

const page = () => {
  return (
    <>
      <PageHead title="Home / Cuez" description="Cuez home feed" />
      <MainWrapper>
        <div className=" flex flex-col w-full">
          <HomeHeader />
          <GetPosts />
        </div>
      </MainWrapper>
    </>
  )
}

export default page
