import { PencilLine } from "lucide-react"
import Link from "next/link"

const Header = () => {
  return (
    <div className="flex sticky top-0 z-50 bg-bgClr items-center justify-between border-b border-zinc-700 px-4 py-2.5">
      <h1 className="font-semibold">Profile</h1>
      <Link
        href="/settings/profile"
        className="flex items-center gap-1 rounded-xl bg-zinc-800 hover:bg-zinc-700/70 transition-colors duration-200 px-3 py-1.5 border font-semibold text-sm border-zinc-700"
      >
        <PencilLine size={16} />
        Edit Profile
      </Link>
    </div>
  )
}

export default Header
