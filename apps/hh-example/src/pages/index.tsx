import styled from '@emotion/styled'
import type { NextPage } from 'next'
import Link from 'next/link'
import { Layout, List } from 'antd'

const { Header, Content, Footer, Sider } = Layout

const posts = [
  {
    title: '무한 스크롤',
    path: '/infinite-scroll',
    tags: ['nextJs', 'react-query', 'infinite-scroll'],
  },
  {
    title: 'useLayoutEffect',
    path: '/use-layout-effect',
    tags: ['react'],
  },
  {
    title: 'useTransition',
    path: '/use-transition',
    tags: ['react'],
  },
  {
    title: 'error boundary',
    path: '/error-boundary',
    tags: ['next', 'react-query', 'error-boundary'],
  },
]

const Home: NextPage = () => {
  return (
    <Block>
      <StyledHeader>
        <h2>hhxdragon</h2>
      </StyledHeader>
      <Content>
        <List
          size="large"
          bordered
          dataSource={posts}
          renderItem={(item, index) => (
            <List.Item>
              <Link href={item.path}>
                <a>{item.title}</a>
              </Link>
            </List.Item>
          )}
        />
      </Content>
    </Block>
  )
}

const Block = styled(Layout)`
  h2 {
    color: #fff;
  }
  a {
    width: 100%;
    height: 100%;
  }
`

const StyledHeader = styled(Header)`
  background-color: #70a0ce !important;
`

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default Home
