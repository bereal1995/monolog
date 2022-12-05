import styled from '@emotion/styled'

import WriteComment from './WriteComment'
import CommentItem from './CommentItem'

import { Comment } from '@/lib/api/types'
import { mediaQuery } from '@/lib/media'

interface Props {
  comments: Comment[]
}
function CommentList({ comments }: Props) {
  return (
    <Block>
      <CommentTitle>댓글 {comments.length}개</CommentTitle>
      <WriteComment />
      <List>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </List>
    </Block>
  )
}

const Block = styled.div`
  padding: 16px;
  ${mediaQuery(768)} {
    padding-left: 0;
    padding-right: 0;
  }
`

const CommentTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin-top: 16px;
`

export default CommentList
