import styled from '@emotion/styled'

import Block, { BlockProps } from './Block'
import { BlockContent, BlockItem } from './Block.styled'
import Unsupported from './Unsupported'

function ColumnList({ block }: BlockProps) {
  if (block?.type !== 'column_list') return <Unsupported />
  return (
    <BlockItem>
      <BlockContainer className="column_list">
        {block.children?.map(({ children: column, index }) => {
          return (
            <ColumnItem key={column?.[0].id || index}>
              {column?.map((block) => {
                return <Block key={`${block.id}-child-${block.id}`} block={block} />
              })}
            </ColumnItem>
          )
        })}
      </BlockContainer>
    </BlockItem>
  )
}

const BlockContainer = styled(BlockContent)`
  display: flex;
`

const ColumnItem = styled.div`
  flex: 1;
  width: 50%;
`

export default ColumnList
