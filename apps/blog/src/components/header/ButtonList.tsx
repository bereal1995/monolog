import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { Button } from 'ui'

import ThemeToggleButton from './ThemeToggleButton'

import { mq } from '@/src/styles/GlobalStyle'

interface Props {}

const headerButtonList = [
  { name: 'Post', link: '/' },
  { name: 'About', link: '/about' },
]

export default function ButtonList(props: Props) {
  const { asPath, push } = useRouter()

  const onClickButton = (link: string) => {
    if (asPath === link) return
    push(link)
  }

  return (
    <Container>
      {headerButtonList.map((item, index) => (
        <Button key={index} className={asPath === item.link ? 'active' : ''} onClick={() => onClickButton(item.link)}>
          {item.name}
        </Button>
      ))}
      <ThemeToggleButton />
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  gap: 10px;

  button {
    ${mq({
      width: ['60px', '60px', '80px'],
    })}
  }
`
