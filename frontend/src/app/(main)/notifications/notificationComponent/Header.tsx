"use client"
import BelowTip from "@/components/infoTips/BelowTip"
import { useDeleteAllNotifications } from "@/hooks/useNotification"
import { MdDeleteOutline } from "react-icons/md"
import { Loader2 } from "lucide-react"
import MenuButton from "@/layout/MenuButton"
const Header = () => {
  const { mutate: deleteAllNotifications, isPending } =
    useDeleteAllNotifications()
  return (
    <div className="flex w-full select-none justify-between items-center border-b h-[60px] border-zinc-700 sticky top-0 bg-bgClr px-4 z-10">
      <div className=" flex items-center gap-4 ">
        <MenuButton />
        <h1 className="font-semibold opacity-95">Notifications</h1>
      </div>
      <BelowTip text="Delete all notifications">
        <div
          className="p-2 hover:bg-zinc-800 rounded-xl w-fit cursor-pointer opacity-95"
          onClick={() => deleteAllNotifications()}
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={22} />
          ) : (
            <MdDeleteOutline size={22} />
          )}
        </div>
      </BelowTip>
    </div>
  )
}

export default Header
