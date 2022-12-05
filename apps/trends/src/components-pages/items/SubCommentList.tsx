import styled from '@emotion/styled'

import CommentItem from './CommentItem'

import { Comment } from '@/lib/api/types'

interface Props {
  comments: Comment[]
}

function SubCommentList({ comments }: Props) {
  if (comments.length === 0) return null
  return (
    <List>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} isSubComment />
      ))}
    </List>
  )
}

const List = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  padding: 24px 0 12px 24px;
`

export default SubCommentList
