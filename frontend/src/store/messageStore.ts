import { create } from "zustand"

interface MessageStore {
  message: string
  type: "success" | "error" | null
  setMessage: (message: string, type: "success" | "error") => void
  clearMessage: () => void
}
const useMessageStore = create<MessageStore>((set) => ({
  message: "",
  type: null,
  setMessage: (message, type) => set({ message, type }),
  clearMessage: () => set({ message: "", type: null }),
}))

export default useMessageStore
