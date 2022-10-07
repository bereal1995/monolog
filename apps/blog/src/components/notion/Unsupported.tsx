import styled from '@emotion/styled'

import { BlockContent, BlockItem } from './Block.styled'

function Unsupported() {
  return (
    <Block>
      <BlockContent>지원하지 않는 형식의 Block 입니다.</BlockContent>
    </Block>
  )
}

export default Unsupported

const Block = styled(BlockItem)`
  font-weight: 600;
  opacity: 0.7;
  text-decoration: underline;
`
