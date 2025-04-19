import { useGetSuggestedUsers } from "@/hooks/useUser"
import { Loader2 } from "lucide-react"
import UserInfo from "./UserInfo"

const SuggestedUsers = () => {
  const { data: suggestedUsers, isLoading } = useGetSuggestedUsers()
  const suggestedUsersLength = suggestedUsers?.users.length || 0

  return (
    <>
      {suggestedUsersLength > 0 && (
        <div className="border rounded-xl border-zinc-700 p-4">
          <h2 className="text-lg font-bold mb-4">Who to follow</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin size-6" />
            </div>
          ) : (
            <div className="space-y-4">
              {suggestedUsers?.users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between"
                >
                  <UserInfo user={user} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SuggestedUsers
