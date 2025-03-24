import Image from "next/image"

const Header = () => {
  return (
    <div className="flex w-full py-4 justify-center items-center">
      <Image
        src="/img/icon/cuez-logo.png"
        alt="logo"
        width={32}
        height={32}
        className="size-8"
      />
    </div>
  )
}

export default Header
