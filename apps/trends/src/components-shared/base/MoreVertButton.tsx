import styled from '@emotion/styled'
import { AiOutlineMore } from 'react-icons/ai'

import { colors } from '@/lib/colors'

interface Props {
  onClick(): void
}

function MoreVertButton({ onClick }: Props) {
  return (
    <StyledButton onClick={onClick}>
      <AiOutlineMore />
    </StyledButton>
  )
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: -8px;
  color: ${colors.gray5};
  svg {
    width: 24px;
    height: 24px;
  }
`

export default MoreVertButton
