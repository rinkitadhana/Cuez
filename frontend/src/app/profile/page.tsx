import MainWrapper from "@/layout/MainWrapper"
import Header from "./profileComponent/Header"
import Image from "next/image"
import { Calendar, Link, MapPin } from "lucide-react"

const page = () => {
  return (
    <MainWrapper>
      <div>
        <Header />
        <div className="rounded-xl relative mb-[60px]">
          <Image
            src="/img/pfp/4201.jpg"
            className="w-full h-[200px] object-cover"
            alt="profile"
            width={1000}
            height={1000}
          />
          <Image
            src="/img/pfp/Gruz.jpeg"
            className="absolute -bottom-[60px] left-5 size-[120px] rounded-xl"
            alt="profile"
            width={1000}
            height={1000}
          />
        </div>
        <div className="px-5 py-3 flex flex-col gap-2.5">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Gruz</h1>
            <p className="text-sm text-zinc-400 -mt-0.5">@damnGruz</p>
          </div>
          <p className="">I use Cuez btw.</p>
          <div className="flex gap-3 items-center text-sm text-zinc-400">
            <div className="flex gap-1 items-center">
              <MapPin size={14} /> Earth, Milky way!{" "}
            </div>
            <div className="flex gap-1 items-center">
              <Link size={14} />{" "}
              <a
                href="https://rinkit.tech"
                target="_blank"
                className="text-blue-500 hover:underline"
                rel="noopener noreferrer"
              >
                rinkit.tech
              </a>
            </div>
            <div className="flex gap-1 items-center">
              <Calendar size={14} /> Joined March 2025
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-1">
              <span>344</span> <span className="text-zinc-400">Following</span>
            </div>
            <div className="flex gap-1">
              <span>2k</span> <span className="text-zinc-400">Followers</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <div className="flex border-b border-zinc-700">
            <div className="px-4 py-2 hover:bg-zinc-800 cursor-pointer">
              Posts
            </div>
            <div className="px-4 py-2 hover:bg-zinc-800 cursor-pointer">
              Likes
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  )
}

export default page
