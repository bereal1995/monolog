import styled from '@emotion/styled'
import { Heading1BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockItem, HeadContent as _HeadContent } from './Block.styled'
import RichText from './RichText'

function Heading1({ block }: BlockProps<Heading1BlockObjectResponse>) {
  return (
    <StyledBlockItem>
      <HeadContent>
        <RichText rich_text={block.heading_1.rich_text} />
      </HeadContent>
    </StyledBlockItem>
  )
}

export default Heading1

const StyledBlockItem = styled(BlockItem)`
  margin-top: 2em;
  margin-bottom: 4px;
`

const HeadContent = styled(_HeadContent)`
  margin-top: 32px;
  margin-bottom: 4px;
  font-size: 30px;
`
