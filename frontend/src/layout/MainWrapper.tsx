import MobileMenu from "@/layout/MobileMenu"
import MobileNavbar from "./MobileNavbar"
import LeftSidebar from "./sidebars/LeftSidebar"
import RightSidebar from "./sidebars/RightSidebar"
import PostButton from "@/components/pageComponents/PostButton"

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="flex justify-center lg:w-[1200px] w-full mx-auto h-screen gap-4 overflow-hidden ">
        <div className="lg:w-[17%] md:w-[25%] w-full h-full hidden md:block md:pl-4">
          <LeftSidebar />
        </div>
        <div className="relative lg:w-[53%] md:w-full w-full md:border-x md:border-zinc-700 overflow-y-auto scrollbar-hide mb-10 md:mb-0">
          <PostButton />
          {children}
        </div>
        <div className="lg:w-[30%] pr-4 w-full h-full overflow-y-auto scrollbar-hide md:hidden hidden lg:hidden xl:block">
          <RightSidebar />
        </div>
      </main>
      <MobileNavbar />
      <MobileMenu />
    </>
  )
}

export default MainWrapper
