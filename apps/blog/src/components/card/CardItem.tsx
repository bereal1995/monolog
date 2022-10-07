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
  transition: transform 0.25s cubic-bezier(0, 0, 0.2, 1) 0s; // easing 참고 https://material.io/design/motion/speed.html#easing
  &:hover {
    transform: translateY(-20px);
  }
  a {
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
