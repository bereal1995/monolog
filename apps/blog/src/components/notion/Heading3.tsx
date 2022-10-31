import styled from '@emotion/styled'
import { Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockItem, HeadContent as _HeadContent } from './Block.styled'
import BlockChildren from './BlockChildren'
import RichText from './RichText'

function Heading3({ block }: BlockProps<Heading3BlockObjectResponse>) {
  return (
    <>
      <StyledBlockItem>
        <HeadContent>
          <RichText rich_text={block.heading_3.rich_text} />
        </HeadContent>
      </StyledBlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

export default Heading3

const StyledBlockItem = styled(BlockItem)`
  margin-top: 1em;
  margin-bottom: 1px;
`

const HeadContent = styled(_HeadContent)`
  font-size: 20px;
`
