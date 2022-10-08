import styled from '@emotion/styled'
import { ColumnListBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import Block, { BlockProps } from './Block'
import { BlockContent, BlockItem } from './Block.styled'

function ColumnList({ block }: BlockProps<ColumnListBlockObjectResponse>) {
  return (
    <BlockItem>
      <BlockBox>
        {block.children?.map(({ children }) => {
          return children?.map((childBlock) => {
            return <Block key={`${childBlock.id}-child-${childBlock.id}`} block={childBlock} />
          })
        })}
      </BlockBox>
    </BlockItem>
  )
}

const BlockBox = styled(BlockContent)`
  display: flex;
`

export default ColumnList
