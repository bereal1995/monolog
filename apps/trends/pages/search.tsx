import { GetServerSideProps } from 'next'

import SearchContainer from '@/components-pages/search/SearchContainer'
import { searchItems } from '@/lib/api/search'
import { SearchItemsResult } from '@/lib/api/types'

interface Props {
  initialSearchResult: SearchItemsResult
}

export default function Search({ initialSearchResult }: Props) {
  return <SearchContainer initialSearchResult={initialSearchResult} />
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
