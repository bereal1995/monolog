import styled from '@emotion/styled'
import Link from 'next/link'

import { useThemeMode } from '@/src/styles/ThemeProvider'

interface Props {
  id?: string
  title?: string
}

export default function CardItem ({ id, title }: Props) {
  const { theme } = useThemeMode()
  return (
    <Container>
      <Link href={`/${id}`}>
        <a>
          <TextBox>
            <h3>{title}</h3>
          </TextBox>
          <ImgBox/>
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
