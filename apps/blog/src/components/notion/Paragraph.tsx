import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockItem } from './Block.styled'
import BlockChildren from './BlockChildren'
import RichText from './RichText'

function Paragraph({ block }: BlockProps<ParagraphBlockObjectResponse>) {
  return (
    <>
      <BlockItem>
        <RichText rich_text={block.paragraph.rich_text} />
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

export default Paragraph
