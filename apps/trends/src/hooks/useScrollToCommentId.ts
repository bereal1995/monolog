export function useScrollToCommentId() {
  const scrollToCommentId = (commentId: number) => {
    const comment = document.body.querySelector<HTMLDivElement>(`[data-comment-id="${commentId}"]`)
    if (!comment) return

    comment.scrollIntoView()
  }

  return { scrollToCommentId }
}
