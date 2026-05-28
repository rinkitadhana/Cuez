const Notification = () => {
  return (
    <div className="flex px-4 sm:px-6 py-4 border-b border-zinc-800 animate-pulse">
      <div className=" shrink-0 mr-3 sm:mr-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full sm:rounded-xl bg-zinc-800" />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-wrap gap-2">
          <div className="h-4 w-24 sm:w-32 bg-zinc-800 rounded-full" />
          <div className="h-4 w-20 sm:w-24 bg-zinc-800 rounded-full" />
        </div>
        <div className="h-4 w-[80%] bg-zinc-800 rounded-full mt-2" />
      </div>

      <div className="w-8 h-8 bg-zinc-800/50 rounded-xl self-start" />
    </div>
  )
}

export default Notification
