import styled from '@emotion/styled'
import UserInfo from './UserInfo'

export interface User {
  id: string
  email: string | undefined
  name: string
  providerId: string
  photoUrl: string
}
interface Props {
  user?: User
  onLogin: () => void
  onLogout: () => void
}

function GlobalHeader({ user, onLogin, onLogout }: Props) {
  const isLogin = !!user

  return (
    <HeaderWrapper>
      <Content>
        <Logo>HH</Logo>
        <Actions>
          <AuthWrapper>{isLogin ? <UserInfo user={user} onLogout={onLogout} /> : <LoginButton onClick={onLogin}>로그인</LoginButton>}</AuthWrapper>
        </Actions>
      </Content>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  height: 64px;
  background: var(--hh-bg-color);
  color: var(--hh-fg-color);
`
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  height: 100%;
  padding: 0 12px;
  margin: 0 auto;
`
const Logo = styled.div`
  font-weight: 700;
  font-size: 28px;
`

const Actions = styled.div``
const AuthWrapper = styled.div``
const LoginButton = styled.button`
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--hh-fg-color);
  background: transparent;
  color: var(--hh-fg-color);
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background: var(--hh-fg-color);
    color: var(--hh-bg-color);
  }
`

export default GlobalHeader
