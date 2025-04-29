import MainWrapper from "@/layout/MainWrapper"
import Header from "./bookmarkComponent/Header"
import GetBookmarks from "./bookmarkComponent/GetBookmarks"
import PageHead from "@/components/pageComponents/PageHead"
const page = () => {
  return (
    <MainWrapper>
      <PageHead title="Bookmarks / Cuez" />
      <Header />
      <GetBookmarks />
    </MainWrapper>
  )
}

export default page
