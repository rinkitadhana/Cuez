import { create } from "zustand"

interface FeedTypeStore {
  feedType: string
  setFeedType: (feedType: string) => void
}

const useFeedTypeStore = create<FeedTypeStore>((set) => ({
  feedType: "All",
  setFeedType: (feedType) => set({ feedType }),
}))

export default useFeedTypeStore