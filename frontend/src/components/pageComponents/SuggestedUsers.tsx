import Image from "next/image"
import { useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import { IoMdCheckmark } from "react-icons/io"

interface SuggestedUser {
  id: number
  name: string
  username: string
  profilePicture: string
  isFollowing: boolean
}

const SuggestedUsers = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([
    {
      id: 1,
      name: "Sarah",
      username: "@sarahj",
      profilePicture: "",
      isFollowing: false,
    },
    {
      id: 2,
      name: "Mike Chen",
      username: "@mikechen",
      profilePicture: "",
      isFollowing: false,
    },
    {
      id: 3,
      name: "Emma Davis",
      username: "@emmad",
      profilePicture: "",
      isFollowing: false,
    },
  ])

  const handleFollow = (userId: number) => {
    setSuggestedUsers((users) =>
      users.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    )
  }

  return (
    <div className=" border rounded-xl border-zinc-700 p-4">
      <h2 className="text-lg font-bold mb-4">Who to follow</h2>
      <div className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {user.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              )}
              <div>
                <p className="font-semibold truncate">{user.name}</p>
                <p className="text-zinc-400 text-sm truncate">
                  {user.username}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleFollow(user.id)}
              className={` py-1.5 rounded-xl text-sm font-semibold transition-colors
                ${
                  user.isFollowing
                    ? "bg-zinc-700 text-white hover:bg-zinc-600 px-2"
                    : "bg-mainclr text-white hover:bg-mainclr/75 px-4"
                }`}
            >
              {user.isFollowing ? (
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
    </div>
  )
}

export default SuggestedUsers
