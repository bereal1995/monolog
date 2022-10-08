import styled from '@emotion/styled'
import { Heading2BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockItem, HeadItem } from './Block.styled'
import BlockChildren from './BlockChildren'

function Heading2({ block }: BlockProps<Heading2BlockObjectResponse>) {
  return (
    <>
      <BlockItem>
        <HeadContent>{block.heading_2.rich_text[0].plain_text}</HeadContent>
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

export default Heading2

const HeadContent = styled(HeadItem)`
  font-size: 1.5em;
`
