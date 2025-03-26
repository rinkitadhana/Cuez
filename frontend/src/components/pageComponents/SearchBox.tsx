"use client"

import { Search } from "lucide-react"

interface SearchBoxProps {
  onSearch?: (query: string) => void
  placeholder?: string
}

export const SearchBox = ({
  onSearch,
  placeholder = "Search Cuez",
}: SearchBoxProps) => {
  return (
    <div className="relative w-full max-w-md select-none">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-1.5 pl-10 pr-4 placeholder:text-zinc-400 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none "
          placeholder={placeholder}
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-zinc-400" />
        </div>
      </div>
    </div>
  )
}
