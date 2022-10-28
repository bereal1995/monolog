import styled from '@emotion/styled'
import type { NextPage } from 'next'
import Link from 'next/link'
import { lightTheme } from 'ui/constants/colors'

const posts = [
  {
    title: '무한 스크롤',
    path: '/infinite-scroll',
  },
  {
    title: 'useLayoutEffect',
    path: '/use-layout-effect',
  },
]

const Home: NextPage = () => {
  return (
    <Block>
      <h2>hhxdragon</h2>
      <ul>
        {posts.map((post, index) => {
          return (
            <Link href={post.path} key={post.title}>
              <li>
                <span>{`${index + 1}. `}</span>
                <a>{post.title}</a>
              </li>
            </Link>
          )
        })}
      </ul>
    </Block>
  )
}

const Block = styled.div`
  h2 {
    padding: 5px 10px;
    border-bottom: 1px solid ${lightTheme.divider};
  }
  ul {
    padding: 10px;
    li {
      padding: 5px 0;
      cursor: pointer;
      &:hover {
        color: ${lightTheme.textSecondary};
      }
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default Home
