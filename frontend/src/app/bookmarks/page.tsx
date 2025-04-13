import MainWrapper from "@/layout/MainWrapper"
import Header from "./bookmarkComponent/Header"

const page = () => {
  return (
    <MainWrapper>
      <Header />
      <div className="flex flex-col h-screen"></div>
    </MainWrapper>
  )
}

export default page
