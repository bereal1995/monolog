import styled from '@emotion/styled'

import { Button } from 'ui'

interface Props {
}

const headerButtonList = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' }
]

export default function ButtonList (props: Props) {
  return (
    <Container>
      {
        headerButtonList.map((item, index) => (
          <Button
            key={index}
          >
            {item.name}
          </Button>
        ))
      }
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  gap: 10px;
`
