import styled from '@emotion/styled'

import { Button } from 'ui'

import { useThemeMode } from '@/styles/ThemeProvider'

interface Props {
}

const headerButtonList = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' }
]

export default function ButtonList (props: Props) {
  const { themeMode, handleThemeChange } = useThemeMode()

  const handleClickThemeButton = () => {
    handleThemeChange(themeMode === 'light' ? 'dark' : 'light')
  }
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
      <Button onClick={handleClickThemeButton}>
        {themeMode}
      </Button>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  gap: 10px;
`
