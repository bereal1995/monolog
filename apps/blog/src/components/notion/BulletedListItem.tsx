import { BulletedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import styled from '@emotion/styled'

import { BlockProps } from './Block'
import { BlockContent, BlockItem, BlockPrefix } from './Block.styled'
import BlockChildren from './BlockChildren'

function BulletedListItem({ block }: BlockProps<BulletedListItemBlockObjectResponse>) {
  return (
    <>
      <BlockItem>
        <BlockBullet>
          <span />
        </BlockBullet>
        <BlockContent>{block.bulleted_list_item.rich_text[0].plain_text}</BlockContent>
      </BlockItem>
      <BlockChildren blockChildren={block.children} />
    </>
  )
}

export default BulletedListItem

const BlockBullet = styled(BlockPrefix)`
  span {
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.textPrimary};
  }
`
