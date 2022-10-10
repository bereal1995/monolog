import styled from '@emotion/styled'
import { GetStaticProps } from 'next'

import { BlockType, getBlocksWithChildren, getFullBlocks, getNotionPage, getRootBlockChildren } from '../api/notion'
import Block from '../components/notion/Block'
import { getTitleFromPage, setBlocksWithChildren } from '../lib/notion'
import { wrapper } from '../modules/store'

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

export async function getStaticPaths() {
  const blocks = await getRootBlockChildren()
  const ids = blocks?.filter((block) => block.type === 'child_page').map((block) => block.id)

  console.log('ids', ids)

  return {
    paths: ids?.map((id) => ({
      params: {
        pageId: id.toString(),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store) => async ({ params }) => {
  const pageId = params?.pageId as string
  const page = await getNotionPage(pageId)
  const pageTitle = getTitleFromPage(page)

  const initBlocks = await getFullBlocks(pageId)
  const blocksWithChildren = await getBlocksWithChildren(initBlocks)
  const blocks = setBlocksWithChildren(blocksWithChildren)

  return {
    props: {
      blocks,
      title: pageTitle,
    },
  }
})
