import { BulletedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import styled from '@emotion/styled'

import Block, { BlockProps } from './Block'
import { BlockChildren, BlockContent, BlockItem } from './Block.styled'

function BulletedListItem({ block }: BlockProps<BulletedListItemBlockObjectResponse>) {
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

const BlockBullet = styled.span`
  display: block;
  width: 7px;
  height: 7px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.textPrimary};
`
