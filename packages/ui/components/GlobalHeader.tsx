import styled from '@emotion/styled'
import UserInfo from './UserInfo'

interface Props {
  isLoggedIn?: boolean
  username?: string
  avatarUrl?: string
  onClickLogo?: () => void
  onLogin?: () => void
  onClickAvatar?: () => void
}

function GlobalHeader({ isLoggedIn = false, username, avatarUrl, onClickLogo, onLogin, onClickAvatar }: Props) {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Content>
          <Logo onClick={onClickLogo}>HH</Logo>
          <Actions>
            <AuthWrapper>
              {isLoggedIn ? (
                <UserInfo username={username} avatarUrl={avatarUrl} onClickAvatar={onClickAvatar} />
              ) : (
                <LoginButton onClick={onLogin}>로그인</LoginButton>
              )}
            </AuthWrapper>
          </Actions>
        </Content>
      </HeaderInner>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  background: var(--hh-bg-color);
`
const HeaderInner = styled.div`
  height: 64px;
  background: transparent;
  backdrop-filter: saturate(180%) blur(8px);
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
  cursor: pointer;
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
