import styled from '@emotion/styled'
import { Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockItem, HeadItem } from './Block.styled'

function Heading3({ block }: BlockProps<Heading3BlockObjectResponse>) {
  return (
    <BlockItem>
      <HeadContent>{block.heading_3.rich_text[0].plain_text}</HeadContent>
    </BlockItem>
  )
}

export default Heading3

const HeadContent = styled(HeadItem)`
  font-size: 1.25em;
`
