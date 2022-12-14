import type { NextPage } from 'next'

import PokemonList from '@/src/posts/infinite-scroll/components/PokemonList'
import DefaultLayout from '@/src/layout/DefaultLayout'

const InfiniteScrollPage: NextPage = () => {
  return (
    <DefaultLayout title="무한스크롤 + 스크롤 유지 (포켓몬)">
      <PokemonList />
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default InfiniteScrollPage
