import { useGetMe } from "@/hooks/useAuth"
import useMenuStore from "@/store/MenuStrore"
import Image from "next/image"
import React from "react"

const MenuButton = () => {
  const { data } = useGetMe()
  const { setOpen } = useMenuStore()
  return (
    <div onClick={() => setOpen(true)} className="md:hidden block">
      <Image
        src={data?.user?.profileImg || "/img/pfp/default.webp"}
        alt="menu"
        width={24}
        height={24}
        className="rounded-xl size-[34px] object-cover"
      />
    </div>
  )
}

export default MenuButton
