import { NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockContent, BlockItem, BlockPrefix } from './Block.styled'
import BlockChildren from './BlockChildren'

function NumberedListItem({ block }: BlockProps<NumberedListItemBlockObjectResponse>) {
  return (
    <>
      <BlockItem data-id={block.id} data-type={block.type}>
        <BlockPrefix>{block.index}.</BlockPrefix>
        <BlockContent>number</BlockContent>
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

export default NumberedListItem
