import styled from '@emotion/styled'
import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Image from 'next/image'

import { BlockProps } from './Block'
import { BlockItem } from './Block.styled'

function ImageBlock({ block }: BlockProps<ImageBlockObjectResponse>) {
  if (block.image.type !== 'file') return null

  return (
    <Block>
      <Image src={block.image.file.url} alt="notion image" layout="fill" objectFit="contain" />
    </Block>
  )
}

const Block = styled(BlockItem)`
  position: relative;
  width: 100%;
  padding-bottom: 30%;
`

export default ImageBlock
