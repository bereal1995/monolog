import styled from '@emotion/styled'

import { BlockProps } from './Block'
import { BlockItem } from './Block.styled'
import Unsupported from './Unsupported'

function ImageBlock({ block }: BlockProps) {
  if (block?.type !== 'image') return <Unsupported />
  if (block.image.type !== 'file') return null

  return (
    <Block className="image_block">
      {/* <Image src={block.image.file.url} alt="notion image" layout="fill" objectFit="contain" priority /> */}
      <img src={block.image.file.url} alt="notion image" />
    </Block>
  )
}

const Block = styled(BlockItem)`
  position: relative;
  width: 100%;
  padding-bottom: 30%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export default ImageBlock
