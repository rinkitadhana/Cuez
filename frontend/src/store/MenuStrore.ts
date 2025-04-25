import { create } from "zustand"

interface MenuStore {
  open: boolean
  setOpen: (open: boolean) => void
}
const useMenuStore = create<MenuStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}))

export default useMenuStore
