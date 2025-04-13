import {
  useFollowUnfollowUser,
  useGetSuggestedUsers,
  useIsFollowing,
} from "@/hooks/useUser"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { IoMdCheckmark } from "react-icons/io"

const SuggestedUsers = () => {
  const { data: suggestedUsers, isLoading } = useGetSuggestedUsers()
  const { mutate: followUnfollowUser } = useFollowUnfollowUser()
  const { data: isFollowing, isLoading: isFollowingLoading } = useIsFollowing(
    suggestedUsers?.users[0]?._id || ""
  )
  const handleFollow = (userId: string) => {
    followUnfollowUser(userId)
  }

  return (
    <>
      <div className="border rounded-xl border-zinc-700 p-4">
        <h2 className="text-lg font-bold mb-4">Who to follow</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin size-6" />
          </div>
        ) : (
          <div className="space-y-4">
            {suggestedUsers?.users.map((user) => (
              <div key={user._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 ">
                  {user.profileImg ? (
                    <Image
                      src={user.profileImg}
                      alt={user.fullName}
                      width={40}
                      height={40}
                      className="rounded-xl select-none"
                    />
                  ) : (
                    <Image
                      width={40}
                      height={40}
                      className="rounded-xl select-none"
                      src="/img/pfp/default.webp"
                      alt="Default profile picture"
                    />
                  )}
                  <div>
                    <p className="font-semibold truncate">{user.fullName}</p>
                    <p className="text-zinc-400 text-sm truncate">
                      {user.username}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleFollow(user._id)}
                  className={`select-none py-1.5 rounded-xl text-sm font-semibold transition-colors
                    ${
                      isFollowingLoading
                        ? "bg-zinc-700"
                        : isFollowing?.isFollowing
                        ? "bg-zinc-700 text-white hover:bg-zinc-600 px-2"
                        : "bg-mainclr text-white hover:bg-mainclr/75 px-4"
                    }`}
                >
                  {isFollowingLoading ? (
                    "Loading..."
                  ) : isFollowing?.isFollowing ? (
                    <span className="flex items-center">
                      <IoMdCheckmark className="mr-1" />
                      Following
                    </span>
                  ) : (
                    "Follow"
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default SuggestedUsers
