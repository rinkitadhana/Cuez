import React from "react"

interface ButtonBlueProps {
  text: string
}
const ButtonBlue: React.FC<ButtonBlueProps> = ({ text }) => {
  return (
    <button
      type="submit"
      className="select-none text-center  px-3 py-2 bg-mainclr hover:bg-mainclr/70 cursor-pointer transition duration-200 rounded-[10px] "
    >
      {text}
    </button>
  )
}

export default ButtonBlue
