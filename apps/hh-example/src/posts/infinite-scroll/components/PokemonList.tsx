import styled from '@emotion/styled'
import { Card, List } from 'antd'
import Link from 'next/link'
import React from 'react'

import { PokemonItem, useInfinitePokemon, useIntersect } from '../hooks'

import PokemonListItem from './PokemonListItem'

function PokemonList() {
  const { data, fetchNextPage, isLoading, isFetchingNextPage, status } = useInfinitePokemon()
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target)
    if (!isFetchingNextPage) {
      fetchNextPage()
    }
  })

  const listData = data?.pages.reduce((acc, page) => [...acc, ...page.results], [] as PokemonItem[])

  return (
    <Block>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
        }}
        dataSource={listData ?? []}
        renderItem={(pokemonItem) => {
          const id = pokemonItem.url.split('/').at(-2)
          return (
            <List.Item>
              <Link href={`/${id}`}>
                <a>
                  <Card title={pokemonItem.name} hoverable>
                    <PokemonListItem {...pokemonItem} />
                  </Card>
                </a>
              </Link>
            </List.Item>
          )
        }}
      />
      <Target ref={ref} />
      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </Block>
  )
}

const Block = styled.section`
  max-width: 800px;
  padding: 20px 0;
  margin: 0 auto;
  a {
    text-decoration: none;
  }
`

const Target = styled.div`
  height: 1px;
`

export default PokemonList
