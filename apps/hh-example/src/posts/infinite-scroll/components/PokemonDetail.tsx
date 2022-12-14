import Image from 'next/image'
import styled from '@emotion/styled'

import { Pokemon } from '@/src/types/pokemon'

interface Props extends Pokemon {}

function PokemonDetail(props: Props) {
  const { id, name, sprites, base_experience, height, order, weight, types, abilities } = props

  return (
    <Block>
      <Top>
        <Thumb>
          <Image src={sprites.back_default} alt={name} layout="fill" />
        </Thumb>
        <div>{name}</div>
      </Top>
      <Bottom>
        <div>아이디: {id}</div>
        <div>경험치: {base_experience}</div>
        <div>도감번호: {order}</div>
        <div>키: {height}</div>
        <div>무게: {weight}</div>
        <div>타입: {types.map(({ type }) => type.name).join(', ')}</div>
        <div>기술: {abilities.map(({ ability }) => ability.name).join(', ')}</div>
      </Bottom>
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
`
const Thumb = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Top = styled.div`
  margin-bottom: 30px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  text-transform: capitalize;
`

const Bottom = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 20px;
  padding: 20px;
  margin-top: 30px;

  background-color: #000;
  border-radius: 10px;
  color: #fff;
  text-align: center;

  & > div {
    max-width: 200px;
    text-align: left;
    font-size: 18px;
  }
`

export default PokemonDetail
