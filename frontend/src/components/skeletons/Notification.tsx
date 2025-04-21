const Notification = () => {
  return (
    <div className="flex px-6 py-4 border-b border-zinc-700 animate-pulse">
      <div className="relative mr-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-800" />
        <div className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-zinc-800" />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="h-4 w-32 bg-zinc-800 rounded" />
            <div className="h-4 w-24 bg-zinc-800 rounded mt-2" />
          </div>
        </div>
        <div className="h-4 w-3/4 bg-zinc-800 rounded mt-2" />
      </div>
      <div className="w-8 h-8 bg-zinc-800 rounded-xl self-center ml-2" />
    </div>
  )
}

export default Notification
