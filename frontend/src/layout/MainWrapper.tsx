import LeftSidebar from "./sidebars/LeftSidebar"
import RightSidebar from "./sidebars/RightSidebar"

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-[1200px] mx-auto h-screen gap-4">
      <div className="w-[22%]">
        <LeftSidebar />
      </div>
      <div className="w-[55%] border-x border-zinc-700">{children}</div>
      <div className="w-[22%]">
        <RightSidebar />
      </div>
    </main>
  )
}

export default MainWrapper
