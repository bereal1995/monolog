import styled from '@emotion/styled'
import { Heading1BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockItem, HeadContent as _HeadContent } from './Block.styled'
import RichText from './RichText'

function Heading1({ block }: BlockProps<Heading1BlockObjectResponse>) {
  return (
    <BlockItem>
      <HeadContent>
        <RichText rich_text={block.heading_1.rich_text} />
      </HeadContent>
    </BlockItem>
  )
}

export default Heading1

const HeadContent = styled(_HeadContent)`
  margin-top: 32px;
  margin-bottom: 4px;
  font-size: 30px;
`
