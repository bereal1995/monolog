import axios from 'axios'
import { GetServerSideProps } from 'next'

import { Pokemon } from '../types/pokemon'

interface Props {
  pokemon: Pokemon
}

function Detail({ pokemon }: Props) {
  return (
    <div>
      <img src={pokemon.sprites.back_default} alt="" />
      <div>아이디 : {pokemon.id}</div>
      <div>이름 : {pokemon.name}</div>
      <div>경험치 : {pokemon.base_experience}</div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get<Pokemon[]>(`https://pokeapi.co/api/v2/pokemon/${params?.pokemonId}`)

  return { props: { pokemon: data } }
}

export default Detail
