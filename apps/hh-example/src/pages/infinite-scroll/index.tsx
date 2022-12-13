import styled from '@emotion/styled'
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

const Block = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;

  h2 {
    padding: 5px 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #fcf;
    font-size: 20px;
    font-weight: 600;
  }
`

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default InfiniteScrollPage
