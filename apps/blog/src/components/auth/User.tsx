import styled from '@emotion/styled'

import { css } from '@emotion/react'

import Avatar from '@/components/avatar'
import { useAuth } from '@/components/auth/AuthProvider'

export default function User () {
  const { user, signOut } = useAuth()
  return (
    <Container>
      <Avatar
        shape="circle"
        className={'user'}
        size={36}
        src={user?.photoUrl}/>
      <button onClick={signOut}
              css={css`
                margin-left: 10px;
              `}
      >로그아웃
      </button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`
