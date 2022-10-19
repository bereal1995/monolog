import styled from '@emotion/styled'

import Block from '../notion/Block'

import { BlockType } from '@/src/api/notion'

interface Props {
  block: BlockType
}

function ListItem({ block }: Props) {
  const createDate = new Date(block.created_time)
  const createdTime = new Intl.DateTimeFormat('ko-KR', { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' }).format(createDate)
  return (
    <Container>
      <Block block={block} />
      <CreatedTimeText>{createdTime}</CreatedTimeText>
    </Container>
  )
}

const Container = styled.div`
  padding: 5px 0;
  margin-bottom: 20px;
  /* border-bottom: 1px solid ${({ theme }) => theme.divider}; */
  a {
    color: ${({ theme }) => theme.primary};
    font-size: 23px;
    font-weight: 600;
    text-decoration: none;
  }
`

const CreatedTimeText = styled.p`
  padding: 3px 2px;
  font-size: 12px;
`

export default ListItem
