import BulletedListItem from './BulletedListItem'

import { BlockType } from '@/src/api/notion'

interface Props {
  block: BlockType
}

function Block({ block }: Props) {
  const { type } = block

  switch (type) {
    case 'paragraph':
      return <div>Paragraph</div>
    // return <Paragraph block={block} />
    case 'heading_1':
      return <div>Heading1</div>
    // return <Heading1 block={block} />
    case 'heading_2':
      return <div>Heading2</div>
    // return <Heading2 block={block} />
    case 'heading_3':
      return <div>Heading3</div>
    // return <Heading3 block={block} />
    case 'bulleted_list_item':
      return <BulletedListItem block={block} />
    case 'numbered_list_item':
      return <div>NumberedListItem</div>
    // return <NumberedListItem block={block} />
    case 'to_do':
      return <div>ToDo</div>
    // return <ToDo block={block} />
    case 'toggle':
      return <div>Toggle</div>
    // return <Toggle block={block} />
    case 'child_page':
      return <div>ChildPage</div>
    // return <ChildPage block={block} />
    case 'unsupported':
      return <div>Unsupported</div>
    // return <Unsupported block={block} />
    default:
      return <div>Unsupported</div>
    // return <Unsupported block={block} />
  }
}

export default Block
