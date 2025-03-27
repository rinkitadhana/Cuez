import { MdDeleteOutline } from "react-icons/md"

const Header = () => {
  return (
    <div className="flex w-full select-none justify-between items-center border-b py-2.5 border-zinc-700 sticky top-0 bg-bgClr px-6 z-10">
      <h1 className="font-semibold opacity-95">Notifications</h1>
      <div className="flex items-center gap-2">
        <div className="p-2 hover:bg-zinc-800 rounded-xl cursor-pointer opacity-95">
          <MdDeleteOutline className="text-xl" />
        </div>
      </div>
    </div>
  )
}

export default Header
