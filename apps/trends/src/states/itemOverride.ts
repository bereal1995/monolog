import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { ItemStats } from '@/lib/api/types'

interface OverridableItem {
  isLiked?: boolean
  itemStats?: ItemStats
  isBookmarked?: boolean
}
type ItemsState = Record<number, OverridableItem | undefined>
interface ItemOverrideState {
  items: ItemsState
  setItemOverride(itemId: number, overridableItem: OverridableItem): void
}

export const useItemOverrideStore = create<ItemOverrideState>()(
  devtools((set) => ({
    items: {},
    setItemOverride: (itemId, overridableItem) =>
      set((state) => {
        if (!state.items[itemId]) {
          state.items[itemId] = overridableItem
        }
        return {
          items: {
            ...state.items,
            [itemId]: {
              ...state.items[itemId],
              ...overridableItem,
            },
          },
        }
      }),
  })),
)

export function useItemOverrideById(itemId: number) {
  const { items } = useItemOverrideStore()
  return items[itemId]
}

export function useItemOverrideSetter() {
  const setItemOverride = useItemOverrideStore((state) => state.setItemOverride)
  return setItemOverride
}
