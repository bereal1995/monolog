import { BlockProps } from './Block'
import { BlockItem } from './Block.styled'
import BlockChildren from './BlockChildren'
import RichText from './RichText'
import Unsupported from './Unsupported'

function Paragraph({ block }: BlockProps) {
  if (block?.type !== 'paragraph') return <Unsupported />
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
