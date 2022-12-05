import styled from '@emotion/styled'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import CommentEditor from './CommentEditor'

import { useCreateCommentMutation } from '@/hooks/mutation/useCreateCommentMutation'
import { useCommentsQuery } from '@/hooks/query/useCommentsQuery'
import { useItemId } from '@/hooks/useItemId'
import { useScrollToCommentId } from '@/hooks/useScrollToCommentId'

function WriteComment() {
  const [text, setText] = useState('')
  const itemId = useItemId()
  const queryClient = useQueryClient()
  const { scrollToCommentId } = useScrollToCommentId()

  const { mutateAsync: writeComment, isLoading } = useCreateCommentMutation({
    onSuccess(data) {
      queryClient.invalidateQueries(useCommentsQuery.extractKey(itemId!))
      setTimeout(() => {
        scrollToCommentId(data.id)
      }, 100)
    },
  })

  const onSubmit = async () => {
    if (!itemId) return
    if (text === '') return
    await writeComment({
      itemId,
      text,
    })
  }

  return (
    <Block>
      <CommentEditor onChangeText={setText} text={text} onSubmit={onSubmit} isLoading={isLoading} mode="write" />
    </Block>
  )
}

const Block = styled.div`
  width: 100%;
`

export default WriteComment
