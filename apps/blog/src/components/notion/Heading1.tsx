import styled from '@emotion/styled'
import { Heading1BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockItem, HeadItem } from './Block.styled'

function Heading1({ block }: BlockProps<Heading1BlockObjectResponse>) {
  return (
    <BlockItem>
      <HeadContent>{block.heading_1.rich_text[0].plain_text}</HeadContent>
    </BlockItem>
  )
}

export default Heading1

const HeadContent = styled(HeadItem)`
  font-size: 1.875em;
`
