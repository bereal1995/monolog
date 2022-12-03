import HomeContainer from '@/components-pages/home/HomeContainer'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      return res.json()
    },
  })

  return <HomeContainer />
}

export const getStaticProps: GetStaticProps = async ({ locale = 'ko' }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['posts'], async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    return res.json()
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['seo'])),
    },
  }
}
