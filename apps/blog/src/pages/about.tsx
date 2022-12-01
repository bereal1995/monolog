import styled from '@emotion/styled'
import { GetServerSideProps } from 'next'

import { BlockType, getBlocksWithChildren, getFullBlocks, getNotionPage } from '../api/notion'
import Block from '../components/notion/Block'
import HeadMeta from '../components/seo/HeadMeta'
import { NOTION } from '../constants/notion'
import { getTitleFromPage, setBlocksWithChildren } from '../lib/notion'
import { wrapper } from '../modules/store'
import { mq } from '../styles/GlobalStyle'

interface Props {
  blocks: BlockType[]
  title: string
}

export default function About({ blocks, title }: Props) {
  return (
    <>
      <HeadMeta title="HH | About" />
      <Container>
        <h1>{title}</h1>
        <article>
          {blocks.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </article>
      </Container>
    </>
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
      ${mq({
        width: ['35%', '35%', '20%'],
      })}
      .image_block {
        min-height: 100px;
      }
    }
  }
`

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const pageId = NOTION.ABOUT_DATABASE_ID!
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
