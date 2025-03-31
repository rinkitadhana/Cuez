import React from "react"

const BelowTip = ({
  children,
  text,
}: {
  children: React.ReactNode
  text: string
}) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute w-max min-w-[50px] -bottom-12 right-0 font-medium px-3 py-1 rounded-lg border border-zinc-700 bg-zinc-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform group-hover:translate-y-0 translate-y-1 transition-all duration-300 ease-out">
        {text}
        <div className="absolute -top-1 right-4 w-2 h-2 rotate-45 bg-zinc-800 border-l border-t border-zinc-700" />
      </div>
    </div>
  )
}

export default BelowTip
