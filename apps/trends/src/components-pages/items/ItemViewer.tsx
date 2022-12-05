import { FaGlobeAsia } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

import { Item } from '@/lib/api/types'
import { useItemOverrideById } from '@/states/itemOverride'
import { useDateDistance } from '@/hooks/useDateDistance'
import { useLikeManager } from '@/hooks/useLikeManager'
import { useBookmarkManager } from '@/hooks/useBookmarkManager'
import { useOpenLoginDialog } from '@/hooks/useOpenLoginDialog'
import { useOpenDialog } from '@/states/dislog'
import { deleteItem } from '@/lib/api/items'
import Button from '@/components-shared/system/Button'
import LikeButton from '@/components-shared/system/LikeButton'
import BookmarkButton from '@/components-shared/system/BookmarkButton'
import { colors } from '@/lib/colors'
import { mediaQuery } from '@/lib/media'

interface Props {
  item: Item
  isMyItem?: boolean
}
function ItemViewer({ item, isMyItem }: Props) {
  const { thumbnail, publisher, title, body, author, user, createdAt, id } = item
  const itemOverride = useItemOverrideById(id)
  const dateDistance = useDateDistance(createdAt)

  const itemStats = itemOverride?.itemStats ?? item.itemStats
  const isLiked = itemOverride?.isLiked ?? item.isLiked
  const likes = itemOverride?.itemStats?.likes ?? itemStats.likes
  const isBookmarked = itemOverride?.isBookmarked ?? item.isBookmarked

  const { like, unlike } = useLikeManager()
  const { create: createBookmark, remove: removeBookmark } = useBookmarkManager()
  const openLoginDialog = useOpenLoginDialog()
  const currentUser = useUser()

  const toggleLike = () => {
    if (!currentUser) {
      openLoginDialog('like')
      return
    }
    if (isLiked) {
      unlike(id, itemStats)
    } else {
      like(id, itemStats)
    }
  }
  const toggleBookmark = () => {
    if (!currentUser) {
      openLoginDialog('bookmark')
      return
    }
    if (isBookmarked) {
      removeBookmark(id)
    } else {
      createBookmark(id)
    }
  }

  const openDialog = useOpenDialog()
  const router = useRouter()
  const onClickDelete = () => {
    openDialog({
      mode: 'OK_CANCEL',
      title: '삭제하시겠습니까?',
      description: '삭제된 아이템은 복구할 수 없습니다.',
      cancelText: '취소',
      confirmText: '삭제',
      async onConfirm() {
        await deleteItem(id)
        router.push('/')
      },
    })
  }
  const onClickModify = () => {
    router.push('/write/edit', { query: { itemId: id } })
  }

  return (
    <Block>
      {thumbnail ? (
        <a href={item.link}>
          <Thumbnail src={thumbnail} alt="" />
        </a>
      ) : null}
      <Content>
        <ItemHead>
          <ItemInfo>
            <Publisher>
              {publisher.favicon ? <img src={publisher.favicon} alt="favicon" /> : <FaGlobeAsia />}
              {author ? `${author} · ` : ''}
              {publisher.name}
            </Publisher>
            <Title>{title}</Title>
          </ItemInfo>
          <Button variant="secondary" href={item.link}>
            방문
          </Button>
        </ItemHead>
        {isMyItem ? (
          <MyItemActions
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <TextButton onClick={onClickModify}>수정</TextButton>
            <TextButton onClick={onClickDelete}>삭제</TextButton>
          </MyItemActions>
        ) : null}
        <Body>{body}</Body>
        <AnimatePresence initial={false}>
          {likes === 0 ? null : (
            <LikesCount key="likes" initial={{ height: 0, opacity: 0 }} animate={{ height: 26, opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              좋아요 {likes.toLocaleString()}개
            </LikesCount>
          )}
        </AnimatePresence>
        <Footer>
          <IconButtons>
            <LikeButton isLiked={isLiked} onClick={toggleLike} />
            <BookmarkButton isActive={isBookmarked} onClick={toggleBookmark} />
          </IconButtons>
          <UserInfo>
            by <b>{user.username}</b> · {dateDistance}
          </UserInfo>
        </Footer>
      </Content>
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  & > a {
    display: block;
  }
`
const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
`
const Content = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${colors.gray0};
  ${mediaQuery(768)} {
    padding-left: 0;
    padding-right: 0;
  }
`

const MyItemActions = styled.div`
  display: none;
  gap: 4px;
  margin-top: 0;
  margin-left: -4px;
  color: ${colors.gray2};
  font-size: 14px;
  ${mediaQuery(500)} {
    display: flex;
  }
`

const TextButton = styled.button`
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${colors.gray3};
    text-decoration: underline;
  }
`

const Publisher = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: ${colors.gray3};
  font-size: 14px;
  line-height: 1.5;
  img,
  svg {
    display: block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`
const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.gray5};
  line-height: 1.5;
`
const Body = styled.p`
  margin-top: 16px;
  margin-bottom: 32px;
  font-size: 14px;
  line-height: 1.5;
  color: ${colors.gray4};
  white-space: pre-wrap;
  word-break: keep-all;
`
const LikesCount = styled(motion.div)`
  display: flex;
  height: 20px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  color: ${colors.gray4};
`
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const IconButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ItemHead = styled.div`
  display: flex;
  word-break: break-word;
  gap: 16px;
  & > button {
    flex-shrink: 0;
  }
`

const ItemInfo = styled.div`
  flex: 1;
`

const UserInfo = styled.div`
  color: ${colors.gray2};
  font-size: 14px;
`

export default ItemViewer
