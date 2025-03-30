import { PencilLine } from "lucide-react"

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-2.5">
        <h1 className="font-semibold">Profile</h1>
        <button className="flex items-center gap-1 rounded-xl bg-zinc-800 hover:bg-zinc-700/70 transition-colors duration-200 px-3 py-1.5 border font-semibold text-sm border-zinc-700">
            <PencilLine size={16} />Edit Profile
        </button>
      
    </div>
  )
}

export default Header
