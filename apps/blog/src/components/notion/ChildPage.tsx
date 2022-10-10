import styled from '@emotion/styled'
import { ChildPageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Link from 'next/link'

import { BlockProps } from './Block'
import { BlockContent, BlockItem } from './Block.styled'
import BlockChildren from './BlockChildren'

function ChildPage({ block }: BlockProps<ChildPageBlockObjectResponse>) {
  console.log('block', block)
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
