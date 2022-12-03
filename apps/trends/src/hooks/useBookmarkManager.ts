import { useCallback, useRef } from 'react'

import { useItemOverrideSetter } from '@/states/itemOverride'
import { createBookmark, deleteBookmark } from '@/lib/api/bookmark'

export function useBookmarkManager() {
  const set = useItemOverrideSetter()
  const abortControllers = useRef(new Map<number, AbortController>()).current

  const create = useCallback(
    async (itemId: number) => {
      const prevController = abortControllers.get(itemId)
      try {
        prevController?.abort()
        set(itemId, {
          isBookmarked: true,
        })
        const controller = new AbortController()
        abortControllers.set(itemId, controller)
        await createBookmark(itemId, controller)
        abortControllers.delete(itemId)
      } catch (e) {
        console.error(e)
      }
    },
    [set, abortControllers],
  )

  const remove = useCallback(
    async (itemId: number) => {
      const prevController = abortControllers.get(itemId)
      try {
        prevController?.abort()
        set(itemId, {
          isBookmarked: false,
        })
        const controller = new AbortController()
        abortControllers.set(itemId, controller)
        await deleteBookmark(itemId, controller)
        abortControllers.delete(itemId)
      } catch (e) {
        console.error(e)
      }
    },
    [set, abortControllers],
  )

  return { create, remove }
}
