import styled from '@emotion/styled'
import { GetStaticProps } from 'next'

import { BlockType, getBlocksWithChildren, getFullBlocks, getNotionPage } from '../api/notion'
import Block from '../components/notion/Block'
import { getTitleFromPage, setBlocksWithChildren } from '../lib/notion'
import { wrapper } from '../modules/store'

interface Props {
  blocks: BlockType[]
  title: string
}

export default function About({ blocks, title }: Props) {
  return (
    <Container>
      <h1>{title}</h1>
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

  article {
    padding-top: 10px;
  }

  .column_list {
    & > div:first-of-type {
      flex: none;
      width: 35%;
      .image_block {
        min-height: 100px;
      }
    }
  }
`

export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store) => async () => {
  const pageId = process.env.NEXT_PUBLIC_NOTION_ABOUT_DATABASE_ID as string
  const page = await getNotionPage(pageId)
  const pageTitle = getTitleFromPage(page)

  const initBlocks = await getFullBlocks(pageId)
  const blocksWithChildren = await getBlocksWithChildren(initBlocks)
  const blocks = setBlocksWithChildren(blocksWithChildren)

  return {
    props: {
      blocks,
      title: pageTitle,
      revalidate: 60 * 60,
    },
  }
})
