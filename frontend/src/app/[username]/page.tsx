"use client"
import MainWrapper from "@/layout/MainWrapper"
import Header from "./profileComponent/Header"
import Image from "next/image"
import { Calendar, Link, Loader2, MapPin } from "lucide-react"
import {
  useFollowUnfollowUser,
  useGetUserProfile,
  useIsFollowing,
} from "@/hooks/useUser"
import { useParams } from "next/navigation"
import { useGetMe } from "@/hooks/useAuth"
import GetUserPost from "./profileComponent/GetUserPost"
const page = () => {
  const { username } = useParams()
  const { data, isLoading, isError } = useGetUserProfile(username as string)
  const { data: authUser } = useGetMe()
  const { mutate: followUnfollowUser, isPending: isFollowUnfollowPending } =
    useFollowUnfollowUser()
  const { data: isFollowing } = useIsFollowing(data?.user._id || "")
  const user = data?.user
  const owner = authUser?.user._id === user?._id
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", { month: "long", year: "numeric" })
  }
  const handleFollowUnfollow = () => {
    followUnfollowUser(user?._id || "")
  }
  return (
    <MainWrapper>
      <div>
        <Header />
        <div className="rounded-xl relative mb-[60px]">
          <Image
            src={user?.coverImg || ""}
            className="w-full h-[200px] object-cover"
            alt="profile"
            width={1000}
            height={1000}
          />
          <Image
            src={user?.profileImg || ""}
            className="absolute -bottom-[60px] left-5 size-[120px] rounded-xl"
            alt="profile"
            width={1000}
            height={1000}
          />
          {!owner && (
            <>
              {isFollowing?.isFollowing ? (
                <button
                  onClick={handleFollowUnfollow}
                  className="absolute -bottom-[50px] right-5 bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-all duration-200 px-4 py-1.5 rounded-xl"
                >
                  {isFollowUnfollowPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Following"
                  )}
                </button>
              ) : (
                <button
                  onClick={handleFollowUnfollow}
                  className="absolute -bottom-[50px] right-5 bg-mainclr text-white font-semibold hover:bg-mainclr/80 transition-all duration-200 px-4 py-1.5 rounded-xl"
                >
                  {isFollowUnfollowPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Follow"
                  )}
                </button>
              )}
            </>
          )}
        </div>
        <div className="px-5 py-3 flex flex-col gap-2.5">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{user?.fullName}</h1>
            <p className="text-sm text-zinc-400 -mt-0.5">@{user?.username}</p>
          </div>
          <p className="">{user?.bio}</p>
          <div className="flex gap-3 items-center text-sm text-zinc-400">
            <div className="flex gap-1 items-center">
              <MapPin size={14} /> {user?.location}
            </div>
            {user?.link && (
              <div className="flex gap-1 items-center">
                <Link size={14} />{" "}
                <a
                  href={user?.link || ""}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                  rel="noopener noreferrer"
                >
                  {user?.link || ""}
                </a>
              </div>
            )}
            <div className="flex gap-1 items-center">
              <Calendar size={14} /> Joined {formatDate(user?.createdAt || "")}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-1">
              <span>{user?.followings.length}</span>{" "}
              <span className="text-zinc-400">Following</span>
            </div>
            <div className="flex gap-1">
              <span>{user?.followers.length}</span>{" "}
              <span className="text-zinc-400">Followers</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4  py-2 bg-zinc-800/40 border-b border-zinc-700">
          <div className="flex border items-center rounded-xl w-fit border-zinc-700 select-none">
            <div className="px-4 py-1 font-medium bg-bgClr border-r border-zinc-700 hover:bg-zinc-800 rounded-l-xl cursor-pointer transition-all duration-200">
              Posts
            </div>
            <div className="px-4 py-1 font-medium bg-bgClr hover:bg-zinc-800 rounded-r-xl cursor-pointer transition-all duration-200">
              Likes
            </div>
          </div>
        </div>
        <GetUserPost />
      </div>
    </MainWrapper>
  )
}

export default page
