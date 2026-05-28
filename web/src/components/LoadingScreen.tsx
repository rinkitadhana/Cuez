import Image from "next/image"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bgClr select-none">
      <div className="flex flex-col items-center">
        <div className="relative h-24 w-24">
          <Image
            src="/img/icon/cuez-logo.png"
            alt="Cuez Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}
