import styled from '@emotion/styled'
import { Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockItem, HeadItem } from './Block.styled'
import BlockChildren from './BlockChildren'

function Heading3({ block }: BlockProps<Heading3BlockObjectResponse>) {
  return (
    <>
      <BlockItem>
        <HeadContent>{block.heading_3.rich_text[0].plain_text}</HeadContent>
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

export default Heading3

const HeadContent = styled(HeadItem)`
  font-size: 1.25em;
`
