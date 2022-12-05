import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import SearchContainer from '@/components-pages/search/SearchContainer'
import { searchItems } from '@/lib/api/search'
import { SearchItemsResult } from '@/lib/api/types'

interface Props {
  initialSearchResult: SearchItemsResult
}

function SearchSeo(data: SearchItemsResult) {
  const router = useRouter()
  const query = router.query.q as string
  if (!query) {
    return <NextSeo title="검색" noindex />
  }
  const { totalCount } = data as SearchItemsResult
  const title = `"${query}" 검색 결과 - ${totalCount}개`
  return <NextSeo title={title} noindex />
}

export default function Search({ initialSearchResult }: Props) {
  return (
    <>
      {SearchSeo(initialSearchResult)}
      <SearchContainer initialSearchResult={initialSearchResult} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = context.query.q as string
  if (!q) {
    return {
      props: {
        initialSearchResult: {
          list: [],
          total: 0,
          pageInfo: {
            nextOffset: null,
            hasNextPage: false,
          },
        },
      },
    }
  }
  const initialSearchResult = await searchItems({ q })

  return {
    props: {
      initialSearchResult,
    },
  }
}
