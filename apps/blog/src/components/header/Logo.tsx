import styled from '@emotion/styled'
import Link from 'next/link'
import { themedPalette } from 'ui/theme'

interface Props {}

export default function Logo(props: Props) {
  return (
    <Container>
      <Link href={'/'}>
        <a>hhxdragon</a>
      </Link>
    </Container>
  )
}
const Container = styled.h1`
  font-weight: 700;
  font-size: 20px;
  a {
    text-decoration: none;
    &:hover {
      color: ${themedPalette.active};
    }
  }
`
