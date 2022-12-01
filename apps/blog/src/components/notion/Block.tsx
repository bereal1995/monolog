import React from 'react'

import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import BulletedListItem from './BulletedListItem'
import Paragraph from './Paragraph'
import Heading1 from './Heading1'
import Heading2 from './Heading2'
import Heading3 from './Heading3'
import Unsupported from './Unsupported'
import Code from './Code'
import Divider from './Divider'
import NumberedListItem from './NumberedListItem'
import ImageBlock from './ImageBlock'
import ColumnList from './ColumnList'
import ChildPage from './ChildPage'

import ChildDatabase from './ChildDatabase'

import { BlockType } from '@/src/api/notion'

export interface BlockProps {
  block: BlockObjectResponse & {
    children?: BlockType[]
    index?: number
  }
}

type BlockComponentsKeys = BlockObjectResponse['type']
type BlockComponentsValues = React.FC<BlockProps>
type BlockComponents = Partial<Record<BlockComponentsKeys, BlockComponentsValues>>

const blockComponents: BlockComponents = {
  paragraph: Paragraph,
  heading_1: Heading1,
  heading_2: Heading2,
  heading_3: Heading3,
  bulleted_list_item: BulletedListItem,
  code: Code,
  divider: Divider,
  numbered_list_item: NumberedListItem,
  image: ImageBlock,
  column_list: ColumnList,
  child_page: ChildPage,
  child_database: ChildDatabase,
  quote: () => <div>quote</div>,
  to_do: () => <div>ToDo</div>,
  toggle: () => <div>Toggle</div>,
}

function Block({ block }: BlockProps) {
  const { type } = block

  const BlockComponent = blockComponents[type] || Unsupported

  return <BlockComponent block={block} />
}

export default Block
