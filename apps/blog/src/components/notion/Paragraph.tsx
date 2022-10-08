import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockContent, BlockItem } from './Block.styled'
import BlockChildren from './BlockChildren'

function Paragraph({ block }: BlockProps<ParagraphBlockObjectResponse>) {
  return (
    <>
      <BlockItem>
        <BlockContent>{block.paragraph.rich_text[0]?.plain_text}</BlockContent>
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

export default Paragraph
