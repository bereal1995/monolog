import styled from '@emotion/styled'

import { BlockItem } from './Block.styled'

import Block from './Block'

import { BlockType } from '@/src/api/notion'

interface Props {
  columns?: BlockType[]
}

function Column({ columns }: Props) {
  if (!columns) return null

  return (
    <BlockContainer>
      {columns.map(({ children: column, index }) => {
        return (
          <ColumnItem key={column?.[0].id || index}>
            {column?.map((block) => {
              return <Block key={`${block.id}-child-${block.id}`} block={block} />
            })}
          </ColumnItem>
        )
      })}
    </BlockContainer>
  )
}

const BlockContainer = styled(BlockItem)``

const ColumnItem = styled.div`
  width: 50%;
`

export default Column
