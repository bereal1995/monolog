import styled from '@emotion/styled'
import type { NextPage } from 'next'

import PostList from '../components/PostList'

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
  return {
    props: {},
  }
}

export default Home
