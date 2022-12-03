import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { useOpenDialog } from '@/states/dislog'

const descriptionMap = {
  like: '이 글이 마음에 드셨나요? 이 글을 다른 사람들에게도 추천하기 위해 로그인해주세요.',
  bookmark: '이 글을 북마크하시려면 로그인해주세요.',
  comment: '댓글을 남기기 위해 로그인해주세요.',
  commentLike: '댓글을 추천하기 위해 로그인해주세요.',
}

export function useOpenLoginDialog() {
  const router = useRouter()
  const openDialog = useOpenDialog()

  const openLoginDialog = useCallback(
    (type: keyof typeof descriptionMap) => {
      const description = descriptionMap[type]
      openDialog({
        title: '로그인이 필요합니다',
        description,
        confirmText: '로그인',
        onConfirm: () => router.push(`/auth/login?next=${location.pathname}`),
        mode: 'OK_CANCEL',
      })
    },
    [router, openDialog],
  )

  return openLoginDialog
}
