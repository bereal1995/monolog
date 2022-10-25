import styled from '@emotion/styled'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { OFFSET, useInfinitePokemon, useObserver } from '../hooks'

function PostList() {
  const target = useRef<HTMLDivElement>(null)
  const { data, error, fetchNextPage, hasNextPage, isLoading, isFetching, isFetchingNextPage, status } = useInfinitePokemon()

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      entry.isIntersecting && fetchNextPage()
    })
  }
  const setScrollY = (scrollY: number) => {
    localStorage.setItem('scrollY', String(scrollY))
  }

  useObserver({
    target,
    onIntersect,
  })

  useEffect(() => {
    const scrollY = localStorage.getItem('scrollY')
    // 기본값이 "0"이기 때문에 스크롤 값이 저장됐을 때에만 window를 스크롤시킨다.
    if (scrollY !== '0') window.scrollTo(0, Number(scrollY))
  }, [])

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
                      <a onClick={() => setScrollY(window.scrollY)}>{name}</a>
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
