import styled from '@emotion/styled'
import Image from 'next/image'

import { PokemonItem } from '../hooks'

interface Props extends PokemonItem {
  index?: number
}

function PokemonListItem({ url, name, index }: Props) {
  const id = url.split('/').at(-2)

  return (
    <Block>
      <Thumbnail>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          layout="fill"
        />
      </Thumbnail>
      {/* <span>{name}</span> */}
      {/* <span>{`${index}. ${name}`}</span> */}
    </Block>
  )
}

const Block = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  text-transform: capitalize;
  span {
    margin-right: 10px;
    font-weight: 600;
  }
`

const Thumbnail = styled.div`
  position: relative;
  width: 74px;
  height: 74px;
`

export default PokemonListItem
