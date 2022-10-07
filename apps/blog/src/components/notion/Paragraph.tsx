import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import Block, { BlockProps } from './Block'
import { BlockChildren, BlockContent, BlockItem } from './Block.styled'

function Paragraph({ block }: BlockProps<ParagraphBlockObjectResponse>) {
  return (
    <>
      <BlockItem>
        <BlockContent>{block.paragraph.rich_text[0]?.plain_text}</BlockContent>
      </BlockItem>
      {block.children && (
        <BlockChildren>
          {block.children.map((childBlock) => {
            return <Block key={`${childBlock.id}-child-${childBlock.id}`} block={childBlock} />
          })}
        </BlockChildren>
      )}
    </>
  )
}

export default Paragraph
