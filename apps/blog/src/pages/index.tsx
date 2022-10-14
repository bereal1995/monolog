import styled from '@emotion/styled'

import Block from '../components/notion/Block'

import { useAuth } from '@/components/auth/AuthProvider'
import { wrapper } from '@/modules/store'
import { BlockType, getRootBlockChildren } from '@/api/notion'

interface Props {
  blocks: BlockType[]
}

export default function Home({ blocks }: Props) {
  const { user } = useAuth()

  return (
    <Container>
      {/* <div>
        <img src={user?.photoUrl} alt="" />
        <h2>{user?.name}</h2>
      </div> */}
      <div>
        {blocks.map((block) => (
          <Block key={block.id} block={block} />
        ))}
      </div>
    </Container>
  )
}

const Container = styled.div`
  max-width: 800px;
  padding: 10px;
  margin: 0 auto;
`

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const blocks = await getRootBlockChildren()

  // const initBlocks = await getFullBlocks(pageId)
  // const blocksWithChildren = await getBlocksWithChildren(initBlocks)
  // const blocks = setBlocksWithChildren(blocksWithChildren)

  return {
    props: {
      blocks,
    },
    revalidate: 30,
  }
})
