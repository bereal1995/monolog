import styled from '@emotion/styled'
import type { NextPage } from 'next'
import Link from 'next/link'

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
                <a>
                  <h3>{post.title}</h3>
                  <div>Tag: {post.tags.join(', ')}</div>
                </a>
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
    border-bottom: 1px solid #fcf;
  }
  ul {
    padding: 10px;
    li {
      display: flex;
      padding: 5px 0;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
  a {
    text-decoration: none;
    color: inherit;
    font-size: 12px;
    h3 {
      font-size: 16px;
      font-weight: 600;
    }
  }
`

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default Home
