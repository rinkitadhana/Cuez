import LeftSidebar from "./sidebars/LeftSidebar"
import RightSidebar from "./sidebars/RightSidebar"

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-[1100px] mx-auto h-screen gap-4 ">
      <div className="w-[18%] ">
        <LeftSidebar />
      </div>
      <div className="w-[57%] border-x border-zinc-700 overflow-y-auto scrollbar-hide">
        {children}
      </div>
      <div className="w-[25%] ">
        <RightSidebar />
      </div>
    </main>
  )
}

export default MainWrapper
