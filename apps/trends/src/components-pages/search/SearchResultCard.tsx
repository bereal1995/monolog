import styled from '@emotion/styled'
import Link from 'next/link'
import { FaGlobeAsia } from 'react-icons/fa'

import { colors } from '@/lib/colors'
import { SearchResultItem } from '@/lib/api/types'

interface Props {
  item: SearchResultItem
}

function SearchResultCard({ item }: Props) {
  const { publisher, author, highlight, likes } = item
  const link = `/items/${item.id}`
  return (
    <Block href={link}>
      <Publisher>
        {publisher.favicon ? <img src={publisher.favicon} alt="favicon" /> : <FaGlobeAsia />}
        {author ? `${author} · ` : ''}
        {publisher.name}
      </Publisher>
      <h3 dangerouslySetInnerHTML={{ __html: highlight.title }} />
      <p dangerouslySetInnerHTML={{ __html: highlight.body }} />
      {likes > 0 ? <LikesCount>좋아요 {likes.toLocaleString()}개</LikesCount> : null}
    </Block>
  )
}

const Block = styled(Link)`
  text-decoration: none;
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 400;
    font-size: 16px;
    color: ${colors.gray4};
    line-height: 1.5;
    font-weight: 500;
  }
  em {
    color: ${colors.gray5};
    font-style: normal;
    font-weight: 800;
  }
  p {
    margin: 8px 0;
    font-size: 14px;
    color: ${colors.gray3};
    line-height: 1.5;

    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
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

const LikesCount = styled.div`
  display: flex;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  color: ${colors.gray4};
`

export default SearchResultCard
