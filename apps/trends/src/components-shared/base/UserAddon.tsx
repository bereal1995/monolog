import styled from '@emotion/styled'
import { useRef, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

import Button from '../system/Button'

import UserMenu from './UserMenu'

import { mediaQuery } from '@/lib/media'

interface Props {
  username: string
}
function UserAddon({ username }: Props) {
  const [visible, setVisible] = useState(false)

  const onOpen = () => setVisible(true)
  const onClose = (e?: Event) => {
    const isButton = buttonRef.current?.contains(e?.target as Node) || buttonRef.current === e?.target
    if (isButton) return
    setVisible(false)
  }

  const buttonRef = useRef<HTMLButtonElement>(null)
  return (
    <Responsive>
      <WriteButton to="/write" size="small" variant="secondary">
        새 글 작성
      </WriteButton>
      <Button variant="text" size="small" onClick={onOpen} ref={buttonRef}>
        <StyledSpan>
          <FaUserCircle />
          {username}
        </StyledSpan>
      </Button>
      <UserMenu visible={visible} onClose={onClose} />
    </Responsive>
  )
}

const Responsive = styled.div`
  position: relative;
  display: flex;
`

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }
`

const WriteButton = styled(Button)`
  display: none;
  margin-right: 8px;
  ${mediaQuery(700)} {
    display: flex;
  }
`

export default UserAddon
