import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface BottomSheetModalItem {
  name: string
  onClick(): void
}

interface BottomSheetModalState {
  visible: boolean
  items: BottomSheetModalItem[]
  open(items: BottomSheetModalItem[]): void
  close(): void
}

const initialState: BottomSheetModalState = {
  visible: false,
  items: [],
  open: () => {},
  close: () => {},
}

const bottomSheetModalStore = create<BottomSheetModalState>()(
  devtools((set) => ({
    ...initialState,
    open: (items: BottomSheetModalItem[]) => {
      set({ visible: true, items })
    },
    close: () => {
      set(prev => ({ ...prev, visible: false }))
    },
  })),
)

export function useBottomSheetModalValue() {
  const { visible, items } = bottomSheetModalStore()
  return { visible, items }
}

export function useBottomSheetModalActions() {
  const open = bottomSheetModalStore((state) => state.open)
  const close = bottomSheetModalStore((state) => state.close)
  return { open, close }
}