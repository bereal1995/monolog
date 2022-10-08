import { BulletedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import styled from '@emotion/styled'

import { BlockProps } from './Block'
import { BlockItem, BlockPrefix } from './Block.styled'
import BlockChildren from './BlockChildren'
import RichText from './RichText'

function BulletedListItem({ block }: BlockProps<BulletedListItemBlockObjectResponse>) {
  return (
    <>
      <BlockItem>
        <BlockBullet>
          <span />
        </BlockBullet>
        <RichText rich_text={block.bulleted_list_item.rich_text} />
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
