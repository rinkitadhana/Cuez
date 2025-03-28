import MainWrapper from "@/layout/MainWrapper"
import Header from "./bookmarkComponent/Header"
import PostStructure from "@/components/pageComponents/PostStructure"

const page = () => {
  return (
    <MainWrapper>
      <Header />
      <div className="flex flex-col h-screen" >
        <PostStructure />
        <PostStructure />
        <PostStructure />
        <PostStructure />
        <PostStructure />
        <PostStructure />
      </div>
    </MainWrapper>
  )
}

export default page
