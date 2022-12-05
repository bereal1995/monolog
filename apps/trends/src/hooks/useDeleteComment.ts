import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

import { useCommentsQuery } from './query/useCommentsQuery'
import { useItemId } from './useItemId'

import { deleteComment } from '@/lib/api/items'


export function useDeleteComment() {
  const itemId = useItemId()
  const queryClient = useQueryClient()

  return useCallback(
    async (commentId: number) => {
      if (!itemId) return
      await deleteComment({ itemId, commentId })
      queryClient.invalidateQueries(useCommentsQuery.extractKey(itemId))
    },
    [itemId, queryClient],
  )
}
