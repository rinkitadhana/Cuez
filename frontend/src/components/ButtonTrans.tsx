import React from "react"

interface ButtonTransProps {
  text: string
}
const ButtonTrans: React.FC<ButtonTransProps> = ({ text }) => {
  return (
    <div className="select-none border px-3 py-2 hover:bg-zinc-800 cursor-pointer transition duration-200 border-zinc-500 rounded-[10px] ">
      {text}
    </div>
  )
}

export default ButtonTrans
