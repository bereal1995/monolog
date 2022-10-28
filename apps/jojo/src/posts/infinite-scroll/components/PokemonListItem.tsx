import styled from '@emotion/styled'
import Link from 'next/link'
import Image from 'next/image'

import { lightTheme } from 'ui/constants/colors'

import { PokemonItem } from '../hooks'

interface Props extends PokemonItem {
  index: number
}

function PokemonListItem({ url, name, index }: Props) {
  const id = url.split('/').at(-2)

  return (
    <Link href={`/${id}`}>
      <a>
        <Block>
          <Thumbnail>
            <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name} layout="fill" />
          </Thumbnail>
          <span>{name}</span>
          {/* <span>{`${index}. ${name}`}</span> */}
        </Block>
      </a>
    </Link>
  )
}

const Block = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 112px;
  height: 112px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  span {
    margin-right: 10px;
    font-weight: 600;
  }
  &:hover {
    background-color: ${lightTheme.textPrimary};
    color: ${lightTheme.action.hover};
  }
`

const Thumbnail = styled.div`
  position: relative;
  width: 74px;
  height: 74px;
`

export default PokemonListItem
