"use client"
import BelowTip from "@/components/infoTips/BelowTip"
import { MdDeleteOutline } from "react-icons/md"

const Header = () => {
  return (
    <div className="flex w-full select-none justify-between items-center border-b py-2 border-zinc-700 sticky top-0 bg-bgClr px-6 z-10">
      <h1 className="font-semibold opacity-95">Notifications</h1>
      <BelowTip text="Clear all notifications">
        <div className="p-2 hover:bg-zinc-800 rounded-xl w-fit cursor-pointer opacity-95">
          <MdDeleteOutline size={22} />
        </div>
      </BelowTip>
    </div>
  )
}

export default Header
