import styled from '@emotion/styled'

import { BlockProps } from './Block'
import { BlockItem, HeadContent as _HeadContent } from './Block.styled'
import RichText from './RichText'
import Unsupported from './Unsupported'

function Heading1({ block }: BlockProps) {
  if (block?.type !== 'heading_1') return <Unsupported />
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
