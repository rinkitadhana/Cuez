import Link from "next/link"
import { FiFeather } from "react-icons/fi"

const PostButton = () => {
  return (
    <div className="fixed bottom-20 right-5 md:bottom-10 md:right-10 z-50">
      <Link
        href="/post"
        className="md:bg-mainclr bg-mainclr/80 hover:bg-mainclr/80 text-white font-semibold md:py-3 md:px-4 p-2.5 rounded-full flex items-center gap-2"
      >
        <FiFeather className="md:size-6 size-7" />
        <span className="hidden md:inline">Create Post</span>
      </Link>
    </div>
  )
}

export default PostButton
