import styled from '@emotion/styled'
import Link from 'next/link'

interface Props {}

export default function Logo (props: Props) {
  return (
    <Container>
      <Link href={'/'}>
        <a>LOGO</a>
      </Link>
    </Container>
  )
}
const Container = styled.h1`
  font-weight: 700;
  font-size: 20px;
`
