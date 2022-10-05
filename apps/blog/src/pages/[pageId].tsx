import styled from '@emotion/styled'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { GetServerSideProps } from 'next'

import { getBlocksWithChildren, getFullBlocks } from '../api/notion'

interface Props {
  blocks: BlockObjectResponse
}

export default function PageId({ blocks }: Props) {
  console.log('blocks', blocks)

  return (
    <Container>
      <h1>{'title'}</h1>
    </Container>
  )
}
const Container = styled.div`
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
