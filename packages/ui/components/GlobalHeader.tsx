import styled from '@emotion/styled'

interface Props {
  isLogin: boolean
  onClickAuthButton: () => void
}

function GlobalHeader({ isLogin, onClickAuthButton }: Props) {
  return (
    <HeaderWrapper>
      <Content>
        <Logo>HH</Logo>
        <Actions>
          <button onClick={onClickAuthButton}>{isLogin ? '로그아웃' : '로그인'}</button>
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

export default GlobalHeader
