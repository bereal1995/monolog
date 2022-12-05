import styled from '@emotion/styled'
import { AiOutlineSearch } from 'react-icons/ai'

import { colors } from '@/lib/colors'


interface Props {
  value: string
  onChangeText(text: string): void
}

function SearchInPut({ value, onChangeText }: Props) {
  return (
    <Block>
      <AiOutlineSearch />
      <input
        value={value}
        onChange={(e) => {
          onChangeText(e.target.value)
        }}
      />
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 8px;
  background: ${colors.gray0};
  border-radius: 4px;
  svg {
    width: 16px;
    height: 16px;
  }
  input {
    flex: 1;
    margin-left: 8px;
    background: none;
    border: none;
    outline: none;
  }
`

export default SearchInPut
