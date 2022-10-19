import styled from '@emotion/styled'

import Logo from '@/components/header/Logo'
import ButtonList from '@/components/header/ButtonList'
import { useAuth } from '@/components/auth/AuthProvider'

export default function Header() {
  const { user } = useAuth()
  return (
    <Container>
      <Inner>
        <Logo />
        <ButtonList />
        {/* {
        user
          ? <User/>
          : (
            <Link href={'/login'}>
              <a>로그인</a>
            </Link>
            )
      } */}
      </Inner>
    </Container>
  )
}
const Container = styled.header`
  padding: 0 14px;
  border-bottom: 1px solid #e1e4e8;
  box-shadow: 0 1px 0 rgba(209, 213, 218, 0.25);
`
const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  height: 46px;
  margin: 0 auto;
`
