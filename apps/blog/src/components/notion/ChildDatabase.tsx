import styled from '@emotion/styled'
import Link from 'next/link'
import { themedPalette } from 'ui/theme'

import { BlockProps } from './Block'
import { BlockContent, BlockItem } from './Block.styled'
import BlockChildren from './BlockChildren'
import Unsupported from './Unsupported'

function ChildDatabase({ block }: BlockProps) {
  if (block?.type !== 'child_database') return <Unsupported />

  return (
    <BlockItem>
      <ChildDatabaseBlockContent>
        <Link href={`/${block.id}`}>
          <a>
            <h3>{block.child_database.title}</h3>
          </a>
        </Link>
      </ChildDatabaseBlockContent>
      <BlockChildren blockChildren={block.children} />
    </BlockItem>
  )
}

const ChildDatabaseBlockContent = styled(BlockContent)`
  &:hover {
    background-color: ${themedPalette.hover};
    a {
      color: #fff;
    }
  }
`

export default ChildDatabase
