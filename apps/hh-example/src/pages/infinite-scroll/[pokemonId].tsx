import axios from 'axios'
import { GetServerSideProps } from 'next'

import PokemonDetail from '../../posts/infinite-scroll/components/PokemonDetail'

import { Pokemon } from '../../types/pokemon'

interface Props {
  pokemon: Pokemon
}

function Detail({ pokemon }: Props) {
  return <PokemonDetail {...pokemon} />
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get<Pokemon[]>(`https://pokeapi.co/api/v2/pokemon/${params?.pokemonId}`)

  return { props: { pokemon: data } }
}

export default Detail
