import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

interface Item {
  userId: number
  id: number
  title: string
  body: string
}
interface PokemonItem {
  name: string
  url: string
}

export const OFFSET = 30
const getPokemonList = ({ pageParam = OFFSET }) =>
  axios
    .get<{
      count: number
      next: string
      previous: string
      results: PokemonItem[]
    }>('https://pokeapi.co/api/v2/pokemon', {
      params: {
        limit: OFFSET,
        offset: pageParam,
      },
    })
    .then((res) => res?.data)

const useInfinitePokemon = () => {
  return useInfiniteQuery(['pokemonList'], getPokemonList, {
    getNextPageParam: (lastPage) => {
      const { next } = lastPage

      if (!next) return false

      return Number(new URL(next).searchParams.get('offset'))
    },
  })
}

export { useInfinitePokemon, getPokemonList }
