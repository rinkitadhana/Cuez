"use client"
import React, { useState } from "react"

interface InputProps {
  text: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  ficon?: React.ReactNode
  licon1?: React.ReactNode
  licon2?: React.ReactNode
}
const Input: React.FC<InputProps> = ({
  text,
  type,
  value,
  error,
  onChange,
  ficon,
  licon1,
  licon2,
}) => {
  const [show, setShow] = useState(false)
  return (
    <div
      className={`flex flex-row border  rounded-[10px] gap-3 py-2 px-3 border-zinc  transition-colors duration-200 ${
        error ? "border-red-500" : "border-zinc-500 focus-within:border-mainclr"
      }`}
    >
      {ficon && <div className="text-zinc-500">{ficon}</div>}
      <input
        type={show ? "text" : type}
        value={value}
        onChange={onChange}
        className=" w-full placeholder:text-zinc-500 bg-transparent outline-none placeholder:select-none"
        placeholder={text}
      />
      {licon1 && licon2 && (
        <div
          onClick={() => setShow((prev) => !prev)}
          className="select-none  cursor-pointer opacity-85"
        >
          {show ? licon2 : licon1}
        </div>
      )}
    </div>
  )
}

export default Input
