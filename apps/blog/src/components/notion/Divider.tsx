import styled from '@emotion/styled'
import { DividerBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockContent, BlockItem } from './Block.styled'
import BlockChildren from './BlockChildren'

function Divider({ block }: BlockProps<DividerBlockObjectResponse>) {
  return (
    <>
      <BlockItem>
        <BlockContent>
          <DividerLine />
        </BlockContent>
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

const DividerLine = styled.hr`
  border-color: ${({ theme }) => theme.action.disabledBackground};
`

export default Divider
