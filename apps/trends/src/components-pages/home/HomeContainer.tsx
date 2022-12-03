import styled from '@emotion/styled'

import { useInfiniteQuery } from '@tanstack/react-query'

import { useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import LinkCardList from './LinkCardList'

import TabLayout from '@/components-shared/layouts/TabLayout'
import { useLocale } from '@/hooks/useLocale'
import { mediaQuery } from '@/lib/media'
import { GetItemsResult, ListMode } from '@/lib/api/types'

import { getWeekRangeFromDate } from '@/lib/week'
import { getItems } from '@/lib/api/items'

interface Props {
  initialData: GetItemsResult
}

export default function HomeContainer({ initialData }: Props) {
  const { changeLocale } = useLocale()
  const router = useRouter()
  const [mode, setMode] = useState<ListMode>((router.query.mode as any) ?? 'recent')
  const defaultDateRange = useMemo(() => getWeekRangeFromDate(new Date()), [])
  const startDate = router.query.start as string
  const endDate = router.query.end as string
  const [dateRange, setDateRange] = useState(startDate && endDate ? [startDate, endDate] : defaultDateRange)
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['items', mode].concat(mode === 'past' ? dateRange : []),
    ({ pageParam }) =>
      getItems({
        mode,
        cursor: pageParam,
        ...(mode === 'past' ? { startDate: 'dateRange[0]', endDate: 'dateRange[1]' } : {}),
      }),
    {
      initialData: {
        pageParams: [undefined],
        pages: [initialData],
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage?.pageInfo.hasNextPage) return undefined
        return lastPage.pageInfo.endCursor
      },
    },
  )
  const items = data?.pages.flatMap((page) => page.list)

  return (
    <StyledTabLayout>
      <Content>{items ? <LinkCardList items={items} /> : null}</Content>
    </StyledTabLayout>
  )
}

const StyledTabLayout = styled(TabLayout)`
  padding: 16px;
`

const Content = styled.div`
  ${mediaQuery(1200)} {
    width: 1200px;
    margin: 0 auto;
  }
`
