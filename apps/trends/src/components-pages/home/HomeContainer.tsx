import styled from '@emotion/styled'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

import LinkCardList from './LinkCardList'
import ListModeSelector from './ListModeSelector'
import WeekSelector from './WeekSelector'

import TabLayout from '@/components-shared/layouts/TabLayout'
import { useLocale } from '@/hooks/useLocale'
import { mediaQuery } from '@/lib/media'
import { GetItemsResult, ListMode } from '@/lib/api/types'
import { getWeekRangeFromDate } from '@/lib/week'
import { getItems } from '@/lib/api/items'
import { useIntersect } from '@/hooks/useIntersect'
import EmptyList from '@/components-shared/system/EmptyList'

interface Props {
  initialData: GetItemsResult
}

export default function HomeContainer({ initialData }: Props) {
  const { changeLocale } = useLocale()
  const router = useRouter()
  const [mode, setMode] = useState<ListMode>((router.query.mode as any) ?? 'trending')
  const defaultDateRange = useMemo(() => getWeekRangeFromDate(new Date()), [])
  const startDate = router.query.start as string
  const endDate = router.query.end as string
  const [dateRange, setDateRange] = useState(startDate && endDate ? [startDate, endDate] : defaultDateRange)
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['items', mode].concat(mode === 'past' ? dateRange : []),
    ({ pageParam }) =>
      getItems({
        mode,
        cursor: pageParam,
        ...(mode === 'past' ? { startDate: dateRange[0], endDate: dateRange[1] } : {}),
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
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  })

  const onSelectMode = (mode: ListMode) => {
    setMode(mode)
    router.push({ query: { mode } })
  }

  useEffect(() => {
    if (mode === 'past') {
      setDateRange(startDate && endDate ? [startDate, endDate] : defaultDateRange)
    }
  }, [mode, startDate, endDate, defaultDateRange])

  const items = data?.pages.flatMap((page) => page.list)
  return (
    <StyledTabLayout>
      <Content>
        <ListModeSelector mode={mode} onSelectMode={onSelectMode} />
        {mode === 'past' && <WeekSelector dateRange={dateRange} />}
        {items ? <LinkCardList items={items} /> : null}
        <div ref={ref} />
      </Content>
      {items?.length === 0 ? <EmptyList /> : null}
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
