import { useCallback } from 'react'

import { likeComment, unlikeComment } from '@/lib/api/items'
import { useCommentLikeSetter } from '@/states/commentLikes'

export function useCommentLike() {
  const set = useCommentLikeSetter()
  const like = useCallback(
    ({ commentId, itemId, prevLikes }: LikeParams) => {
      likeComment({
        itemId,
        commentId,
      })
      set(commentId, {
        isLiked: true,
        likes: prevLikes + 1,
      })
    },
    [set],
  )
  const unlike = useCallback(
    ({ commentId, itemId, prevLikes }: UnlikeParams) => {
      unlikeComment({
        itemId,
        commentId,
      })
      set(commentId, {
        isLiked: false,
        likes: prevLikes - 1,
      })
    },
    [set],
  )

  return { like, unlike }
}

interface LikeParams {
  commentId: number
  prevLikes: number
  itemId: number
}
type UnlikeParams = LikeParams
