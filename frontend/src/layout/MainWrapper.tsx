import LeftSidebar from "./sidebars/LeftSidebar"
import RightSidebar from "./sidebars/RightSidebar"

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-[1200px] mx-auto h-screen gap-4 overflow-hidden">
      <div className="w-[17%] h-full">
        <LeftSidebar />
      </div>
      <div className="w-[53%] border-x border-zinc-700 overflow-y-auto scrollbar-hide">
        {children}
      </div>
      <div className="w-[30%] h-full overflow-y-auto scrollbar-hide">
        <RightSidebar />
      </div>
    </main>
  )
}

export default MainWrapper
