import styled from '@emotion/styled'
import Link from 'next/link'
import { lightTheme } from 'ui/constants/colors'

interface Props {
  id?: string
  title?: string
}

export default function CardItem({ id, title }: Props) {
  return (
    <Container>
      <Link href={`/${id}`}>
        <a>
          <TextBox>
            <h3>{title}</h3>
          </TextBox>
          <ImgBox />
        </a>
      </Link>
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  transform: translateY(0px);
  transition: transform 1s cubic-bezier(0, 0.55, 0.45, 1) 0s;
  &:hover {
    transform: translateY(-20px);
  }
  a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${lightTheme.textPrimary};
  }
`

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 12px;
  height: 50%;
`

const ImgBox = styled.div`
  height: 50%;
  background: #fcf;
`