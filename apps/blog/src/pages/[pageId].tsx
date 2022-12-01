import styled from '@emotion/styled'
import { GetStaticProps } from 'next'
import { themedPalette } from 'ui/theme'

import { BlockType, getBlocksWithChildren, getFullBlocks, getNotionPage, getRootBlockChildren } from '../api/notion'
import Block from '../components/notion/Block'
import HeadMeta from '../components/seo/HeadMeta'
import { getTitleFromPage, setBlocksWithChildren } from '../lib/notion'
import { wrapper } from '../modules/store'

interface Props {
  blocks: BlockType[]
  title: string
  lastEditedTime: string
}

export default function PageId({ blocks, title, lastEditedTime }: Props) {
  return (
    <>
      <HeadMeta title={`HH | ${title}`} />
      <Container>
        <Title>
          <h1>{title}</h1>
          <p>마지막 수정: {lastEditedTime}</p>
        </Title>
        <hr />
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
  padding: 0 16px 16px;

  hr {
    margin: 0;
  }

  article {
    padding-top: 10px;
  }
`

const Title = styled.div`
  h1 {
    font-size: 30px;
    padding-top: 10px;
  }
  p {
    font-size: 12px;
    color: ${themedPalette.textSecondary};
    text-align: right;
  }
`

export async function getStaticPaths() {
  const blocks = await getRootBlockChildren()
  const ids = blocks?.filter((block) => block.type === 'child_page').map((block) => block.id)

  return {
    // paths: ids?.map((id) => ({
    //   params: {
    //     pageId: id.toString(),
    //   },
    // })),
    paths: [
      {
        params: {
          pageId: 'ca174b6c-9719-4a3a-878f-03d54ccdffac',
        },
      },
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store) => async ({ params }) => {
  const pageId = params?.pageId as string
  const page = await getNotionPage(pageId)
  const pageTitle = getTitleFromPage(page, 'title')
  const lastEditedDate = new Date(page?.last_edited_time || '')
  const lastEditedTime = new Intl.DateTimeFormat('ko-KR', { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' }).format(lastEditedDate)
  const initBlocks = await getFullBlocks(pageId)
  const blocksWithChildren = await getBlocksWithChildren(initBlocks)
  const blocks = setBlocksWithChildren(blocksWithChildren)
  return {
    props: {
      blocks,
      title: pageTitle,
      lastEditedTime,
      page,
      revalidate: 30,
    },
  }
})
