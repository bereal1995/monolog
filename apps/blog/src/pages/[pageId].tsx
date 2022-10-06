import styled from '@emotion/styled'
import { GetServerSideProps } from 'next'

import { BlockType, getBlocksWithChildren, getFullBlocks } from '../api/notion'
import Block from '../components/notion/Block'

interface Props {
  blocks: BlockType[]
}

export default function PageId({ blocks }: Props) {
  return (
    <Container>
      <h1>{'title'}</h1>
      <hr />
      <article>
        {blocks.map((block) => (
          <Block key={block.id} block={block} />
        ))}
      </article>
    </Container>
  )
}
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;

  h1 {
    font-size: 30px;
    padding: 10px;
  }
`

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pageId = query.pageId as string
  const initBlocks = await getFullBlocks(pageId)
  const blocks = await getBlocksWithChildren(initBlocks)

  return {
    props: {
      blocks,
    },
  }
}
