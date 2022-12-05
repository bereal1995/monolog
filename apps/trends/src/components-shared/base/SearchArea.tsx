import { useRef } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { colors } from '@/lib/colors'


function SearchArea() {
  const ref = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const initialKeyword = router.query.q ?? ''

  const onClick = () => {
    ref.current?.focus()
  }

  const onKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?q=${ref.current?.value}`)
    }
  }

  return (
    <Block>
      <SearchInputWrapper onClick={onClick} onKeyUp={onKeyup}>
        <AiOutlineSearch />
        <input ref={ref} defaultValue={initialKeyword} />
      </SearchInputWrapper>
    </Block>
  )
}

const Block = styled.div``
const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 36px;
  padding-left: 12px;
  padding-right: 14px;
  margin-right: 8px;
  border-radius: 4px;
  background: #f6f6f6;
  border: 1px solid ${colors.gray0};

  & > svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    color: ${colors.gray3};
  }
  input {
    border: none;
    outline: none;
    flex: 1;
    min-width: 0;
    background: none;
  }
`

export default SearchArea
