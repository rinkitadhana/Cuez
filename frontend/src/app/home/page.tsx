import MainWrapper from "@/layout/MainWrapper"
import HomeHeader from "./homeComponents/HomeHeader"
import GetPosts from "./homeComponents/GetPosts"

const page = () => {
  return (
    <MainWrapper>
      <div className=" flex flex-col w-full">
        <HomeHeader />
        <GetPosts/>
      </div>
    </MainWrapper>
  )
}

export default page
