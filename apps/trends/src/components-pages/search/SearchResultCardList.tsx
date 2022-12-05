import styled from '@emotion/styled'

import SearchResultCard from './SearchResultCard'

import { SearchResultItem } from '@/lib/api/types'
import { mediaQuery } from '@/lib/media'

interface Props {
  items: SearchResultItem[]
}

function SearchResultCardList({ items }: Props) {
  return (
    <Block>
      {items.map((item) => (
        <SearchResultCard key={item.id} item={item} />
      ))}
    </Block>
  )
}

const Block = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 16px;
  ${mediaQuery(1024)} {
    width: 768px;
    margin: 0 auto;
  }
`

export default SearchResultCardList
