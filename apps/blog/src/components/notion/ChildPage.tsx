import styled from '@emotion/styled'
import Link from 'next/link'

import { BlockProps } from './Block'
import { BlockContent, BlockItem } from './Block.styled'
import BlockChildren from './BlockChildren'
import Unsupported from './Unsupported'

function ChildPage({ block }: BlockProps) {
  if (block?.type !== 'child_page') return <Unsupported />
  return (
    <BlockItem>
      <ChildPageBlockContent>
        <Link href={`/${block.id}`}>
          <a>
            <h3>{block.child_page.title}</h3>
          </a>
        </Link>
      </ChildPageBlockContent>
      <BlockChildren blockChildren={block.children} />
    </BlockItem>
  )
}

const ChildPageBlockContent = styled(BlockContent)`
  &:hover {
    background-color: ${({ theme }) => theme.action.hover};
    a {
      color: #fff;
    }
  }
`

export default ChildPage
