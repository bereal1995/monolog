import { BulletedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import styled from '@emotion/styled'

import Block from './Block'

import { BlockItem } from './Block.styled'

import { BlockType } from '@/src/api/notion'

interface Props {
  block: BulletedListItemBlockObjectResponse & {
    children?: BlockType[]
  }
}

function BulletedListItem({ block }: Props) {
  return (
    <>
      <BlockItem>
        <BlockBullet />
        <BlockContent>{block.bulleted_list_item.rich_text[0].plain_text}</BlockContent>
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

export default BulletedListItem

const BlockChildren = styled.div`
  margin-left: 20px;
`
const BlockBullet = styled.span`
  display: block;
  width: 7px;
  height: 7px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.textPrimary};
`
const BlockContent = styled.div`
  text-align: center;
`
