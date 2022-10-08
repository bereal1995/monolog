import { DividerBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockContent, BlockItem } from './Block.styled'
import BlockChildren from './BlockChildren'

function Divider({ block }: BlockProps<DividerBlockObjectResponse>) {
  return (
    <>
      <BlockItem>
        <BlockContent>
          <hr />
        </BlockContent>
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

export default Divider
