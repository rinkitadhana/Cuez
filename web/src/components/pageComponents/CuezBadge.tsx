import Image from "next/image"

const CuezBadge = () => {
  return (
    <div
      title="Cuez Badge"
      className="flex items-center border border-zinc-700 select-none rounded-md p-0.5 bg-white"
    >
      <Image
        src="/img/icon/cuez-logo.png"
        alt="cuez-logo"
        width={20}
        height={20}
        className="rounded-full size-[12px]"
      />
    </div>
  )
}

export default CuezBadge
