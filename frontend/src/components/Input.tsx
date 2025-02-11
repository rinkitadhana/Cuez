"use client"
import React, { useState } from "react"

interface InputProps {
  text: string
  type: string
  ficon?: React.ReactNode
  licon1?: React.ReactNode
  licon2?: React.ReactNode
}
const Input: React.FC<InputProps> = ({ text, type, ficon, licon1, licon2 }) => {
  const [show, setShow] = useState(true)
  return (
    <div className=" flex flex-row border border-zinc-500 rounded-[10px] gap-3 py-2 px-3 border-zinc focus-within:border-mainclr transition-colors duration-200">
      {ficon && <div className="text-zinc-500">{ficon}</div>}
      <input
        type={show ? "text" : type}
        className=" w-full bg-transparent outline-none"
        placeholder={text}
      />
      {licon1 && licon2 && (
        <div
          onClick={() => setShow((prev) => !prev)}
          className="cursor-pointer text-zinc-200"
        >
          {show ? licon2 : licon1}
        </div>
      )}
    </div>
  )
}

export default Input
