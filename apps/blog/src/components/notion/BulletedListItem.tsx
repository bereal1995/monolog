import styled from '@emotion/styled'

import { BlockProps } from './Block'
import { BlockItem, BlockPrefix } from './Block.styled'
import BlockChildren from './BlockChildren'
import RichText from './RichText'
import Unsupported from './Unsupported'

function BulletedListItem({ block }: BlockProps) {
  if (block?.type !== 'bulleted_list_item') return <Unsupported />
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
