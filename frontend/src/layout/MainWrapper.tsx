import InfoBar from "@/components/pageComponents/InfoBar"
import Navbar from "@/components/pageComponents/Navbar"

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-w-[1200px] mx-auto w-full">
      <Navbar />
      <div className="flex-1">{children}</div>
      <div className=" border">
        <InfoBar />
      </div>
    </div>
  )
}

export default MainWrapper
