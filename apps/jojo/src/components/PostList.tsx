import styled from '@emotion/styled'
import Link from 'next/link'
import { useRef } from 'react'

import { OFFSET, useInfinitePokemon, useObserver } from '../hooks'

function PostList() {
  const target = useRef<HTMLDivElement>(null)
  const { data, error, fetchNextPage, hasNextPage, isLoading, isFetching, isFetchingNextPage, status } = useInfinitePokemon()

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      entry.isIntersecting && fetchNextPage()
    })
  }

  useObserver({
    target,
    onIntersect,
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
      <div ref={target} />
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

export default PostList
