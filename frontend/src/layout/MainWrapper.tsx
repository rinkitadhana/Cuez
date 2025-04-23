import LeftSidebar from "./sidebars/LeftSidebar"
import RightSidebar from "./sidebars/RightSidebar"

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex justify-center lg:w-[1200px] w-full mx-auto h-screen gap-4 overflow-hidden ">
      <div className="lg:w-[17%] md:w-[25%] w-full h-full hidden md:block md:pl-4">
        <LeftSidebar />
      </div>
      <div className="lg:w-[53%] md:w-full w-full border-x border-zinc-700 overflow-y-auto scrollbar-hide">
        {children}
      </div>
      <div className="lg:w-[30%] pr-4 w-full h-full overflow-y-auto scrollbar-hide md:hidden hidden lg:hidden xl:block">
        <RightSidebar />
      </div>
    </main>
  )
}

export default MainWrapper
