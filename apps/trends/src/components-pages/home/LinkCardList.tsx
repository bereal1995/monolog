import styled from '@emotion/styled'

import LinkCard from './LinkCard'

import { Item } from '@/lib/api/types'
import { mq } from '@/lib/media'

interface Props {
  items: Item[]
}
function LinkCardList({ items }: Props) {
  return (
    <List>
      {items.map((item) => (
        <LinkCard key={item.id} item={item} />
      ))}
    </List>
  )
}

const List = styled.div`
  display: grid;
  ${mq({
    gridTemplateColumns: ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
  })}
  gap: 48px;
`

export default LinkCardList
