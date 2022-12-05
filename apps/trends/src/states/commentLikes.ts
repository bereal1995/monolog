import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface CommentLike {
  isLiked: boolean
  likes: number
}

type CommentLikeState = Record<number, CommentLike | undefined> & {
  setCommentLike: (commentId: number, commentLike: CommentLike) => void
}

const initialState: CommentLikeState = {
  setCommentLike: () => {},
}

export const useCommentLikeStore = create<CommentLikeState>()(
  devtools((set) => ({
    ...initialState,
    setCommentLike: (commentId: number, commentLike: CommentLike) =>
      set((state) => {
        return {
          ...state,
          [commentId]: commentLike,
        }
      }),
  })),
)

export function useCommentLikeValue() {
  return useCommentLikeStore()
}

export function useCommentLikeById(commentId: number) {
  const { [commentId]: commentLike } = useCommentLikeStore()
  return commentLike
}

export function useCommentLikeSetter() {
  const setCommentLike = useCommentLikeStore((state) => state.setCommentLike)
  return setCommentLike
}