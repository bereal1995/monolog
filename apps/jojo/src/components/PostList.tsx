import styled from '@emotion/styled'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { OFFSET, useInfinitePokemon, useObserver } from '../hooks'

function PostList() {
  const target = useRef<HTMLDivElement>(null)
  const { data, fetchNextPage, isLoading, isFetchingNextPage, status } = useInfinitePokemon()

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      entry.isIntersecting && fetchNextPage()
    })
  }
  const setScrollY = (scrollY: number) => {
    sessionStorage.setItem('scrollY', String(scrollY))
  }

  useObserver({
    target,
    onIntersect,
  })

  useEffect(() => {
    const scrollY = sessionStorage.getItem('scrollY')
    console.log('scrollY', scrollY)
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
