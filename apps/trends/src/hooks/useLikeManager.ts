import { useCallback, useRef } from 'react'

import { ItemStats } from '@/lib/api/types'
import { useItemOverrideSetter } from '@/states/itemOverride'
import { likeItem, unlikeItem } from '@/lib/api/items'

export function useLikeManager() {
  const set = useItemOverrideSetter()
  const abortControllers = useRef(new Map<number, AbortController>()).current

  const like = useCallback(
    async (id: number, initialStats: ItemStats) => {
      const prevController = abortControllers.get(id)
      try {
        prevController?.abort()
        set(id, {
          itemStats: { ...initialStats, likes: initialStats.likes + 1 },
          isLiked: true,
        })
        const controller = new AbortController()
        abortControllers.set(id, controller)
        const result = await likeItem(id, controller)
        abortControllers.delete(id)
        set(id, {
          itemStats: result.itemStats,
          isLiked: true,
        })
      } catch (e) {
        console.error(e)
      }
    },
    [set, abortControllers],
  )
  const unlike = useCallback(
    async (id: number, initialStats: ItemStats) => {
      const prevController = abortControllers.get(id)
      try {
        prevController?.abort()
        set(id, {
          itemStats: { ...initialStats, likes: initialStats.likes - 1 },
          isLiked: false,
        })
        const controller = new AbortController()
        abortControllers.set(id, controller)
        const result = await unlikeItem(id, controller)
        abortControllers.delete(id)
        set(id, {
          itemStats: result.itemStats,
          isLiked: false,
        })
      } catch (e) {
        console.error(e)
      }
    },
    [set, abortControllers],
  )

  return { like, unlike }
}
