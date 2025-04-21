import MainWrapper from "@/layout/MainWrapper"
import Header from "./bookmarkComponent/Header"
import GetBookmarks from "./bookmarkComponent/GetBookmarks"

const page = () => {
  return (
    <MainWrapper>
      <Header />
      <GetBookmarks />
    </MainWrapper>
  )
}

export default page
