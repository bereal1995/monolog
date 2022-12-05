import { useCallback, useMemo, useState } from 'react'
import { SlBubbles } from 'react-icons/sl'
import { AiOutlineMore } from 'react-icons/ai'
import MarkdownIt from 'markdown-it'
import { useUser } from '@supabase/auth-helpers-react'
import styled from '@emotion/styled'

import SubCommentList from './SubCommentList'
import ModifyComment from './ModifyComment'
import ReplyComment from './ReplyComment'

import { Comment } from '@/lib/api/types'
import { useCommentLikeById } from '@/states/commentLikes'
import { useCommentLike } from '@/hooks/useCommentLike'
import { useOpenLoginDialog } from '@/hooks/useOpenLoginDialog'
import { useBottomSheetModalActions } from '@/states/bottomSheetModal'
import { useItemId } from '@/hooks/useItemId'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import { isMobile } from '@/lib/isMobile'
import { useDateDistance } from '@/hooks/useDateDistance'
import PopperMenu from '@/components-shared/system/PopperMenu'
import LikeButton from '@/components-shared/system/LikeButton'
import { colors } from '@/lib/colors'
import { markdownStyles } from '@/lib/styles'

interface Props {
  comment: Comment
  isSubComment?: boolean
}

function CommentItem({ comment, isSubComment }: Props) {
  const { user, text, createdAt, subComments, mentionUser, isDeleted } = comment
  const itemId = useItemId()
  const commentLike = useCommentLikeById(comment.id)
  const { like, unlike } = useCommentLike()
  const openLoginDialog = useOpenLoginDialog()
  const currentUser = useUser()
  const isMyComment = comment.user.authId === currentUser?.id
  const { open: openBottomSheetModal } = useBottomSheetModalActions()
  const deleteComment = useDeleteComment()
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isPopperVisible, setIsPopperVisible] = useState(false)

  const items = useMemo(
    () => [
      {
        name: '수정',
        onClick: () => {
          setIsEditing(true)
        },
      },
      {
        name: '삭제',
        onClick: () => {
          deleteComment(comment.id)
        },
      },
    ],
    [comment.id, deleteComment],
  )

  const withMention = useMemo(() => {
    if (!mentionUser) return text
    if (text.startsWith('# ')) return `**@${mentionUser.username}** \n${text}`
    return `**@${mentionUser.username}** ${text}`
  }, [text, mentionUser])

  const html = useMemo(() => {
    return MarkdownIt().render(withMention)
  }, [withMention])

  const onClickMore = () => {
    if (isMobile()) {
      openBottomSheetModal(items)
    } else {
      setIsPopperVisible(true)
    }
  }

  const onClosePopper = useCallback(() => {
    setIsPopperVisible(false)
  }, [])

  const likes = commentLike?.likes ?? comment.likes
  const isLiked = commentLike?.isLiked ?? comment.isLiked

  const toggleLike = () => {
    if (!itemId) return
    if (!currentUser) {
      openLoginDialog('commentLike')
      return
    }

    if (isLiked) {
      unlike({
        commentId: comment.id,
        itemId,
        prevLikes: likes,
      })
    } else {
      like({
        commentId: comment.id,
        itemId,
        prevLikes: likes,
      })
    }
  }

  const onReply = () => {
    setIsReplying(true)
  }

  const dateDistance = useDateDistance(createdAt)

  const onCloseEdit = () => {
    setIsEditing(false)
  }

  const onCloseReply = () => {
    setIsReplying(false)
  }

  if (isDeleted) {
    return (
      <Block>
        <DeletedText>삭제된 댓글입니다.</DeletedText>
        {!isSubComment && subComments && <SubCommentList comments={subComments} />}
      </Block>
    )
  }

  if (isEditing) {
    return (
      <Block>
        <CommentHead>
          <LeftGroup>
            <Username>{user.username}</Username>
            <Time>{dateDistance}</Time>
          </LeftGroup>
        </CommentHead>
        <ModifyComment id={comment.id} initialText={text} onClose={onCloseEdit} />
      </Block>
    )
  }

  if (isEditing) {
    return (
      <Block>
        <CommentHead>
          <LeftGroup>
            <Username>{user.username}</Username>
            <Time>{dateDistance}</Time>
          </LeftGroup>
        </CommentHead>
        <ModifyComment id={comment.id} initialText={text} onClose={onCloseEdit} />
      </Block>
    )
  }

  return (
    <Block data-comment-id={comment.id}>
      <CommentHead>
        <LeftGroup>
          <Username>{comment.user.username}</Username>
          <Time>{dateDistance}</Time>
        </LeftGroup>
        {isMyComment && (
          <div>
            <MoreButton onClick={onClickMore}>
              <AiOutlineMore />
            </MoreButton>
            <PopperMenu items={items} onClose={onClosePopper} visible={isPopperVisible} position={{ top: 16, right: 0 }} />
          </div>
        )}
      </CommentHead>
      <Text dangerouslySetInnerHTML={{ __html: html }}></Text>
      <CommentFooter>
        <LikesBlock>
          <LikeButton size="small" isLiked={isLiked} onClick={toggleLike} />
          <LikeCount>{likes === 0 ? '' : likes.toLocaleString()}</LikeCount>
        </LikesBlock>
        <ReplyButton onClick={onReply}>
          <SlBubbles />
          답글 달기
        </ReplyButton>
      </CommentFooter>

      {isReplying ? (
        <ReplyWrapper>
          <ReplyComment parentCommentId={comment.id} onClose={onCloseReply} />
        </ReplyWrapper>
      ) : null}

      {!isSubComment && comment.subComments && <SubCommentList comments={comment.subComments} />}
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`
const CommentHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const LeftGroup = styled.div`
  display: flex;
  align-items: flex-end;
`
const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${colors.gray5};
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
`

const Username = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: ${colors.gray5};
`
const Time = styled.div`
  margin-left: 8px;
  font-size: 12px;
  line-height: 1.5;
  color: ${colors.gray2};
`

const Text = styled.div`
  margin-top: 4px;
  margin-bottom: 12px;
  color: ${colors.gray5};
  line-height: 1.5;
  word-break: keep-all;
  ${markdownStyles}
  font-size: 14px;
  h5 {
    font-size: 14px !important;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 500;
  }
  p,
  ul,
  ol {
    margin-top: 0;
    margin-bottom: 0;
  }
  strong {
    font-weight: 500;
  }
`

const CommentFooter = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: ${colors.gray3};
  line-height: 1.5;
`
const LikesBlock = styled.div`
  display: flex;
  align-items: center;
`
const LikeCount = styled.span`
  min-width: 24px;
  margin-left: 4px;
`

const ReplyButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  svg {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`

const Mention = styled.span`
  margin-right: 4px;
  color: ${colors.primary};
`

const DeletedText = styled(Text)`
  margin: 0;
  color: ${colors.gray2};
`

const ReplyWrapper = styled.div`
  padding-left: 16px;
  padding-top: 16px;
`

export default CommentItem
