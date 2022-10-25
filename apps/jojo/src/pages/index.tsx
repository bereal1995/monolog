import styled from '@emotion/styled'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import type { NextPage } from 'next'

import PostList from '../components/PostList'
import { fetchPosts } from '../hooks'

const Home: NextPage = () => {
  return (
    <Block>
      <h2>next jojo</h2>
      <PostList />
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #ccc;

  h2 {
    border-bottom: 1px solid #000;
  }
`

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['posts', 10], () => fetchPosts(10))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
