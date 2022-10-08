import styled from '@emotion/styled'
import { Heading2BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockItem, HeadContent as _HeadContent } from './Block.styled'
import BlockChildren from './BlockChildren'
import RichText from './RichText'

function Heading2({ block }: BlockProps<Heading2BlockObjectResponse>) {
  return (
    <>
      <BlockItem>
        <HeadContent>
          <RichText rich_text={block.heading_2.rich_text} />
        </HeadContent>
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

export default Heading2

const HeadContent = styled(_HeadContent)`
  font-size: 24px;
`
