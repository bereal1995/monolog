import styled from '@emotion/styled'

import Link from 'next/link'

import Logo from '@/components/header/Logo'
import ButtonList from '@/components/header/ButtonList'
import User from '@/components/auth/User'
import { useAuth } from '@/components/auth/AuthProvider'

export default function Header () {
  const { user } = useAuth()
  return (
    <Container>
      <Logo/>
      <ButtonList/>
      {
        user
          ? <User/>
          : (
            <Link href={'/login'}>
              <a>로그인</a>
            </Link>
            )
      }
    </Container>
  )
}
const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  padding: 0 14px;
  border-bottom: 1px solid #e1e4e8;
  box-shadow: 0 1px 0 rgba(209, 213, 218, .25);
`
