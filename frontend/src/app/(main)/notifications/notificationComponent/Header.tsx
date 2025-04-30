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
    <div className="flex w-full select-none justify-between items-center border-b border-zinc-800 sticky top-0 bg-bgClr/95 backdrop-blur-sm px-4 sm:px-6 z-10 h-16">
      <div className="flex items-center gap-3">
        <MenuButton />
        <div className="flex items-center">
          <h1 className="font-semibold text-white/95 text-lg">Notifications</h1>
        </div>
      </div>

      <BelowTip text="Delete all notifications">
        <div
          className="p-2 hover:bg-zinc-800 rounded-xl cursor-pointer  transition-colors duration-200"
          onClick={() => deleteAllNotifications()}
          role="button"
          aria-label="Delete all notifications"
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <MdDeleteOutline size={20} />
          )}
        </div>
      </BelowTip>
    </div>
  )
}

export default Header
