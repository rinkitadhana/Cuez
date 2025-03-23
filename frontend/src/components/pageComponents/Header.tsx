import Image from "next/image"

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <Image
        src="/img/icon/cuez-logo.png"
        alt="logo"
        width={32}
        height={32}
        className="size-7"
      />
    </div>
  )
}

export default Header
