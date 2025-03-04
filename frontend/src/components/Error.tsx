const Error = ({ text }: { text: string }) => {
  return (
    <div className=" flex justify-center items-center w-full py-2 text-white bg-red-500/80 font-medium rounded-[10px]">
      {text}
    </div>
  )
}

export default Error
