import BulletedListItem from './BulletedListItem'

import Paragraph from './Paragraph'

import Heading1 from './Heading1'

import Heading2 from './Heading2'
import Heading3 from './Heading3'

import Unsupported from './Unsupported'

import Code from './Code'

import { BlockType } from '@/src/api/notion'

export interface BlockProps<T> {
  block: T & {
    children?: BlockType[]
  }
}

function Block({ block }: BlockProps<BlockType>) {
  const { type } = block

  switch (type) {
    case 'paragraph':
      return <Paragraph block={block} />
    case 'heading_1':
      return <Heading1 block={block} />
    case 'heading_2':
      return <Heading2 block={block} />
    case 'heading_3':
      return <Heading3 block={block} />
    case 'bulleted_list_item':
      return <BulletedListItem block={block} />
    case 'code':
      return <Code block={block}></Code>
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
    default:
      return <Unsupported />
  }
}

export default Block
