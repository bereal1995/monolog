import styled from '@emotion/styled'
import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import Image from 'next/image'

import { BlockProps } from './Block'
import { BlockItem } from './Block.styled'

function ImageBlock({ block }: BlockProps<ImageBlockObjectResponse>) {
  if (block.image.type !== 'file') return null

  return (
    <Block className="image_block">
      <Image src={block.image.file.url} alt="notion image" layout="fill" objectFit="contain" priority />
    </Block>
  )
}

const Block = styled(BlockItem)`
  position: relative;
  width: 100%;
  padding-bottom: 30%;
  /* img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  } */
`

export default ImageBlock
