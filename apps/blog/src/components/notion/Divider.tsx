import styled from '@emotion/styled'
import { themedPalette } from 'ui/theme'

import { BlockProps } from './Block'
import { BlockContent, BlockItem } from './Block.styled'
import BlockChildren from './BlockChildren'
import Unsupported from './Unsupported'

function Divider({ block }: BlockProps) {
  if (block?.type !== 'divider') return <Unsupported />
  return (
    <>
      <BlockItem>
        <BlockContent>
          <DividerLine />
        </BlockContent>
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

const DividerLine = styled.hr`
  border-color: ${themedPalette.disabledBackground};
`

export default Divider
