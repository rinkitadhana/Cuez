import Link from "next/link"
import { FiFeather } from "react-icons/fi"

const PostButton = () => {
  return (
    <div className="fixed md:hidden bottom-20 right-5 z-50">
      <Link
        href="/post"
        className=" bg-mainclr/80  text-white font-semibold p-2.5 rounded-full flex items-center gap-2"
      >
        <FiFeather className="size-7" />
      </Link>
    </div>
  )
}

export default PostButton
