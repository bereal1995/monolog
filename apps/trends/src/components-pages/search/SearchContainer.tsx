import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import styled from '@emotion/styled'

import SearchInPut from './SearchInPut'

import SearchResultCardList from './SearchResultCardList'

import { SearchItemsResult } from '@/lib/api/types'
import { searchItems } from '@/lib/api/search'
import { useIntersect } from '@/hooks/useIntersect'
import TabLayout from '@/components-shared/layouts/TabLayout'
import MobileHeader from '@/components-shared/base/MobileHeader'
import DesktopHeader from '@/components-shared/base/DesktopHeader'

interface Props {
  initialSearchResult: SearchItemsResult
}

function SearchContainer({ initialSearchResult }: Props) {
  const router = useRouter()
  const q = router.query.q as string
  const [searchText, setSearchText] = useState(q ?? '')
  const [debouncedSearchText] = useDebounce(searchText, 300)
  const {
    hasNextPage,
    data: infiniteData,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(['searchResults', debouncedSearchText], ({ pageParam }) => searchItems({ q: debouncedSearchText, offset: pageParam }), {
    enabled: debouncedSearchText !== '',
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo.hasNextPage) return undefined
      return lastPage.pageInfo.nextOffset
    },
    initialData: {
      pageParams: [undefined],
      pages: [initialSearchResult],
    },
  })

  const queryClient = useQueryClient()
  useEffect(() => {
    queryClient.setQueriesData(['searchResults', debouncedSearchText], {
      pageParams: [undefined],
      pages: [initialSearchResult],
    })
  }, [initialSearchResult, debouncedSearchText, queryClient])

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  })

  const onChangeText = (text: string) => {
    setSearchText(text)
  }

  useEffect(() => {
    router.push({ query: { q: debouncedSearchText } })
  }, [debouncedSearchText])

  const items = infiniteData?.pages.flatMap((page) => page.list)
  return (
    <TabLayout
      header={
        <>
          <StyledHeader title={<SearchInPut value={searchText} onChangeText={onChangeText} />} />
          <DesktopHeader />
        </>
      }
    >
      <SearchResultCardList items={items ?? []} />
      <div ref={ref} />
    </TabLayout>
  )
}

const StyledHeader = styled(MobileHeader)`
  & > .hh-title {
    width: 100%;
  }
`

export default SearchContainer
