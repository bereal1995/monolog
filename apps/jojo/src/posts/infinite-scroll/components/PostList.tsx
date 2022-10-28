import styled from '@emotion/styled'
import Link from 'next/link'

import { OFFSET, useInfinitePokemon, useIntersect } from '../hooks'

function PostList() {
  const { data, fetchNextPage, isLoading, isFetchingNextPage, status } = useInfinitePokemon()
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (!isFetchingNextPage) {
      fetchNextPage()
    }
  })

  return (
    <Block>
      <ul>
        {isLoading && <p>불러오는 중</p>}
        {status === 'error' && <p>에러 발생!</p>}
        {status === 'success' &&
          data.pages.map((group, pageIndex) => (
            <ListPageItem key={pageIndex}>
              {group.results.map(({ name, url }, index) => {
                const id = url.split('/').at(-2)
                return (
                  <li key={name + index}>
                    <span>{OFFSET * pageIndex + index + 1}</span>
                    <Link href={`/${id}`}>
                      <a>{name}</a>
                    </Link>
                  </li>
                )
              })}
            </ListPageItem>
          ))}
      </ul>
      <Target ref={ref} />
      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </Block>
  )
}

const Block = styled.section`
  padding-bottom: 20px;
  li {
    span {
      margin-right: 10px;
    }
  }
`

const ListPageItem = styled.div``

const Target = styled.div`
  height: 1px;
`

export default PostList
