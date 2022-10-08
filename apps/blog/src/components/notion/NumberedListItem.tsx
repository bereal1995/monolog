import { NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockItem, BlockPrefix } from './Block.styled'
import BlockChildren from './BlockChildren'
import RichText from './RichText'

function NumberedListItem({ block }: BlockProps<NumberedListItemBlockObjectResponse>) {
  return (
    <>
      <BlockItem data-id={block.id} data-type={block.type}>
        <BlockPrefix>{block.index}.</BlockPrefix>
        <RichText rich_text={block.numbered_list_item.rich_text} />
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

export default NumberedListItem
