import styled from '@emotion/styled'
import { GetServerSideProps } from 'next'

import { BlockType, getBlocksWithChildren, getFullBlocks, getNotionPage } from '../api/notion'
import Block from '../components/notion/Block'
import { getTitleFromPage } from '../lib/notion'

interface Props {
  blocks: BlockType[]
  title: string
}

export default function PageId({ blocks, title }: Props) {
  return (
    <Container>
      <h1>{title}</h1>
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
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;

  h1 {
    font-size: 30px;
    padding: 10px 0;
  }

  hr {
    margin: 0;
  }

  article {
    padding-top: 10px;
  }
`

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pageId = query.pageId as string
  const page = await getNotionPage(pageId)
  const pageTitle = getTitleFromPage(page)
  const initBlocks = await getFullBlocks(pageId)
  const blocks = await getBlocksWithChildren(initBlocks)

  return {
    props: {
      blocks,
      title: pageTitle,
    },
  }
}
