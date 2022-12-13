import styled from '@emotion/styled'
import React from 'react'

import { OFFSET, useInfinitePokemon, useIntersect } from '../hooks'

import PokemonListItem from './PokemonListItem'

function PokemonList() {
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
        {status === 'success' && (
          <ItemList>
            {data.pages.map((group, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {group.results.map((pokemonItem, index) => {
                  return <PokemonListItem key={pokemonItem.name + index} index={OFFSET * pageIndex + index + 1} {...pokemonItem} />
                })}
              </React.Fragment>
            ))}
          </ItemList>
        )}
      </ul>
      <Target ref={ref} />
      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </Block>
  )
}

const Block = styled.section`
  max-width: 800px;
  padding-bottom: 20px;
  margin: 0 auto;
  a {
    text-decoration: none;
  }
`

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Target = styled.div`
  height: 1px;
`

export default PokemonList
