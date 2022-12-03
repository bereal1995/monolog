import { IoMdArrowBack } from 'react-icons/io'
import styled from '@emotion/styled'

interface Props {
  onClick?: () => void
}

function HeaderBackButton({ onClick }: Props) {
  return (
    <IconButton onClick={onClick}>
      <IoMdArrowBack />
    </IconButton>
  )
}

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin: -8px;
  border: none;
  background: none;
  svg {
    width: 24px;
    height: 24px;
  }
`

export default HeaderBackButton
