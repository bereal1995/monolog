import styled from '@emotion/styled'
import { GetServerSideProps } from 'next'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { getNotionPage } from '@/api/notion'
import { getTitleFromPage } from '@/lib/notion'

interface Props {
  notionPage: PageObjectResponse;
}

export default function PageId ({ notionPage }: Props) {
  const title = getTitleFromPage(notionPage)

  return (
    <Container>
      <h1>{title}</h1>
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
  const notionPage = await getNotionPage(query.pageId as string)

  return {
    props: {
      notionPage
    }
  }
}
