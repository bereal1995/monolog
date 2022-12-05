import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'

import { getItems } from '@/lib/api/items'
import HomeContainer from '@/components-pages/home/HomeContainer'
import { GetItemsResult, ListMode } from '@/lib/api/types'
import { getWeekRangeFromDate } from '@/lib/week'

export default function Home({ initialItems }: { initialItems: GetItemsResult }) {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      return res.json()
    },
  })

  return (
    <>
      <NextSeo title="trends" description="It, 개발, 디자인, 트렌드를 한눈에" />
      <HomeContainer initialData={initialItems} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale = 'ko', query }) => {
  const {
    mode,
    start,
    end,
  }: {
    mode?: ListMode
    start?: string
    end?: string
  } = query

  const fallbackMode = mode ?? 'trending'

  const range = mode === 'past' ? getWeekRangeFromDate(new Date()) : undefined
  const startDate = start ?? range?.[0]
  const endDate = end ?? range?.[1]

  const initialItems = await getItems({ mode: fallbackMode, startDate, endDate })
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['posts'], async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    return res.json()
  })

  return {
    props: {
      initialItems,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
