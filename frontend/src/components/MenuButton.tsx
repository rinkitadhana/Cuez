import { useGetMe } from "@/hooks/useAuth"
import Image from "next/image"
import React from "react"

const MenuButton = () => {
  const { data } = useGetMe()
  return (
    <div>
      <Image
        src={data?.user?.profileImg || "/img/pfp/default.webp"}
        alt="menu"
        width={24}
        height={24}
        className="rounded-xl size-9 object-cover"
      />
    </div>
  )
}

export default MenuButton
