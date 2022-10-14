import styled from '@emotion/styled'
import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockProps } from './Block'
import { BlockItem } from './Block.styled'

function ImageBlock({ block }: BlockProps<ImageBlockObjectResponse>) {
  if (block.image.type !== 'file') return null

  return (
    <Block>
      {/* <Image src={block.image.file.url} alt="notion image" layout="fill" objectFit="contain" /> */}
      <img src={block.image.file.url} alt="" />
      {/* <Image src={block.image.file.url} alt="notion image" layout="fill" objectFit="contain" /> */}
    </Block>
  )
}

// https://www.hhxdragon.com/_next/image?url=https%3A%2F%2Fs3.us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0d23b6c8-5402-4975-93ba-6462be9ad903%2FUntitled.png%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Credential%3DAKIAT73L2G45EIPT3X45%252F20221010%252Fus-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20221010T191424Z%26X-Amz-Expires%3D3600%26X-Amz-Signature%3D86699de2bfe82ad3d1fdd811e0af9e9c4973d880e747cb6d402fa74e5222f7ab%26X-Amz-SignedHeaders%3Dhost%26x-id%3DGetObject&w=3840&q=75
// https://www.hhxdragon.com/_next/image?url=https%3A%2F%2Fs3.us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0d23b6c8-5402-4975-93ba-6462be9ad903%2FUntitled.png%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Credential%3DAKIAT73L2G45EIPT3X45%252F20221014%252Fus-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20221014T164606Z%26X-Amz-Expires%3D3600%26X-Amz-Signature%3D0c173932715a19dbdf15cbce26e52d32499339420ff6ffb5fcb18a99fe8d61ff%26X-Amz-SignedHeaders%3Dhost%26x-id%3DGetObject&w=3840&q=75

// https://www.hhxdragon.com/_next/image?url=https%3A%2F%2Fs3.us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0d23b6c8-5402-4975-93ba-6462be9ad903%2FUntitled.png%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Credential%3DAKIAT73L2G45EIPT3X45%252F20221010%252Fus-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20221010T191424Z%26X-Amz-Expires%3D3600%26X-Amz-Signature%3D86699de2bfe82ad3d1fdd811e0af9e9c4973d880e747cb6d402fa74e5222f7ab%26X-Amz-SignedHeaders%3Dhost%26x-id%3DGetObject&w=3840&q=75
// http://localhost:3000/_next/image?url=https%3A%2F%2Fs3.us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0d23b6c8-5402-4975-93ba-6462be9ad903%2FUntitled.png%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Content-Sha256%3DUNSIGNED-PAYLOAD%26X-Amz-Credential%3DAKIAT73L2G45EIPT3X45%252F20221014%252Fus-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20221014T170455Z%26X-Amz-Expires%3D3600%26X-Amz-Signature%3Dc2855f4663f36e840988ac7fcff1986150f4e4a0953fbc293b9840fc84dc4ab4%26X-Amz-SignedHeaders%3Dhost%26x-id%3DGetObject&w=3840&q=75

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
