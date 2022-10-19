import styled from '@emotion/styled'

import ThemeToggleButton from './ThemeToggleButton'

interface Props {}

const headerButtonList = [
  { name: 'Home', link: '/' },
  // { name: 'About', link: '/about' },
]

export default function ButtonList(props: Props) {
  return (
    <Container>
      {/* {headerButtonList.map((item, index) => (
        <Button key={index}>{item.name}</Button>
      ))} */}
      <ThemeToggleButton />
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  gap: 10px;
`
