import Image from "next/image"
import { SlOptions } from "react-icons/sl"

const PostStructure = () => {
  return (
    <section className="flex flex-col gap-4 p-4 border-b border-zinc-700 hover:bg-zinc-900 transition-colors duration-200 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src="/img/pfp/Gruz.jpeg"
            alt="logo"
            width={32}
            height={32}
            className="rounded-lg size-10"
          />
          <div className="flex flex-col -space-y-1">
            <div className="flex gap-2 items-center">
              <h1 className="font-semibold">Gruz</h1>
              <div className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer">
                Follow
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <p className="text-sm text-zinc-400">@damnGruz</p>
              <div className="text-sm text-zinc-400">
                <span> {" • "}</span>
                <span>2h</span>
              </div>
            </div>
          </div>
        </div>
        <SlOptions />
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam dolorem
        incidunt, vel sapiente maiores nemo nostrum quaerat aut unde ducimus
        dignissimos aspernatur.
      </div>
    </section>
  )
}

export default PostStructure
