import { FaGlobeAsia } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

import { useUser } from '@supabase/auth-helpers-react'
import styled from '@emotion/styled'
import Link from 'next/link'

import { Item } from '@/lib/api/types'
import { colors } from '@/lib/colors'
import { mediaQuery } from '@/lib/media'
import { useItemOverrideById } from '@/states/itemOverride'
import { useDateDistance } from '@/hooks/useDateDistance'
import LikeButton from '@/components-shared/system/LikeButton'
import BookmarkButton from '@/components-shared/system/BookmarkButton'
import { useOpenLoginDialog } from '@/hooks/useOpenLoginDialog'
import { useLikeManager } from '@/hooks/useLikeManager'
import { useBookmarkManager } from '@/hooks/useBookmarkManager'

interface Props {
  item: Item
}

function LinkCard({ item }: Props) {
  const { thumbnail, publisher, title, body, author, user, createdAt, id } = item
  const itemOverride = useItemOverrideById(id)
  const dateDistance = useDateDistance(createdAt)
  const { like, unlike } = useLikeManager()
  const { create: createBookmark, remove: removeBookmark } = useBookmarkManager()
  const currentUser = useUser()

  const itemStats = itemOverride?.itemStats ?? item.itemStats
  const isLiked = itemOverride?.isLiked ?? item.isLiked
  const likes = itemOverride?.itemStats?.likes ?? itemStats.likes
  const isBookmarked = itemOverride?.isBookmarked ?? item.isBookmarked

  const openLoginDialog = useOpenLoginDialog()

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

  const link = `/items/${id}`
  const thumbnailStaticUrl = '/shared-assets/placeholder.png'

  return (
    <Block>
      <StyledLink href={link}>
        {thumbnail ? (
          <Thumbnail
            src={thumbnail}
            alt={title}
            onError={(e: any) => {
              const target = e.target as HTMLImageElement
              target.src = thumbnailStaticUrl
            }}
          />
        ) : null}
        <Publisher>
          {publisher.favicon ? <img src={publisher.favicon} alt="favicon" /> : <FaGlobeAsia />}
          {author ? `${author} · ` : ''}
          {publisher.name}
        </Publisher>
        <h3>{title}</h3>
        <p>{body}</p>
      </StyledLink>
      <LikeCountWrapper>
        <AnimatePresence initial={false}>
          {likes === 0 ? null : (
            <LikesCount key="likes" initial={{ height: 0, opacity: 0 }} animate={{ height: 26, opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              좋아요 {likes.toLocaleString()}개
            </LikesCount>
          )}
        </AnimatePresence>
      </LikeCountWrapper>
      <Footer>
        <IconButtons>
          <LikeButton isLiked={isLiked} onClick={toggleLike} />
          <BookmarkButton isActive={isBookmarked} onClick={toggleBookmark} />
        </IconButtons>
        <UserInfo>
          by <b>{user.username}</b> · {dateDistance}
        </UserInfo>
      </Footer>
    </Block>
  )
}

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 600;
    color: ${colors.gray5};
    line-height: 1.5;
  }
  p {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.5;
    color: ${colors.gray4};

    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    ${mediaQuery(768)} {
      height: 84px;
      -webkit-line-clamp: 4;
    }
  }
`
const Thumbnail = styled.img`
  display: block;
  width: 100%;
  max-height: 40vh;
  ${mediaQuery(768)} {
    aspect-ratio: 288/192;
  }
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 15%);
  object-fit: cover;
`
const Publisher = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
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

const LikeCountWrapper = styled.div`
  ${mediaQuery(768)} {
    height: 26px;
  }
`

const IconButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const UserInfo = styled.div`
  color: ${colors.gray2};
  font-size: 14px;
`

export default LinkCard
