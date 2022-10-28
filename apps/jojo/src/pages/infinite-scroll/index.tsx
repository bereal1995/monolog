import styled from '@emotion/styled'
import type { NextPage } from 'next'

import { lightTheme } from 'ui/constants/colors'

import PostList from '@/src/posts/infinite-scroll/components/PokemonList'

const Home: NextPage = () => {
  return (
    <Block>
      <h2>무한스크롤 + 스크롤 유지 (포켓몬)</h2>
      <PostList />
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${lightTheme.background};

  h2 {
    padding: 5px 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${lightTheme.textPrimary};
    font-size: 20px;
    font-weight: 600;
  }
`

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default Home
