import styled from '@emotion/styled'

import Logo from '@/components/header/Logo'
import ButtonList from '@/components/header/ButtonList'

interface Props { }

export default function Header (props: Props) {
  return (
    <Container>
      <Logo/>
      <ButtonList/>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  padding: 0 14px;
  border-bottom: 1px solid #e1e4e8;
  box-shadow: 0 1px 0 rgba(209,213,218,.25);
`
