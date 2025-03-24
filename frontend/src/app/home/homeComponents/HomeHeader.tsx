const HomeHeader = () => {
  return (
    <div className="flex w-full justify-between items-center border-b border-zinc-700 sticky top-0 bg-bgClr ">
      <div className="flex flex-1 justify-center items-center font-lg font-semibold text-zinc-400 p-3 hover:bg-zinc-800 transition-colors duration-200 cursor-pointer">
        Discover
      </div>
      <div className="flex flex-1 justify-center items-center font-lg font-semibold text-zinc-400 p-3 hover:bg-zinc-800 transition-colors duration-200 cursor-pointer">
        Following
      </div>
    </div>
  )
}

export default HomeHeader
