import MainWrapper from "@/layout/MainWrapper"
import HomeHeader from "./homeComponents/HomeHeader"

const page = () => {
  return (
    <MainWrapper>
      <div className=" flex flex-col w-full">
        <HomeHeader />

        <div className="p-4 h-svh">This is a Home page</div>
      </div>
    </MainWrapper>
  )
}

export default page
