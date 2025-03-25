import MainWrapper from "@/layout/MainWrapper"
import HomeHeader from "./homeComponents/HomeHeader"
import PostStructure from "@/components/pageComponents/PostStructure"

const page = () => {
  return (
    <MainWrapper>
      <div className=" flex flex-col w-full">
        <HomeHeader />
        <div className="flex flex-col h-screen">
          <PostStructure />
          <PostStructure />
          <PostStructure />
          <PostStructure />
          <PostStructure />
          <PostStructure />
          <PostStructure />
          <PostStructure />
        </div>
      </div>
    </MainWrapper>
  )
}

export default page
