import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from 'ui'

import { appSelector, setThemeMode } from '@/src/modules/app/reducer'

interface Props {}

const headerButtonList = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
]

export default function ButtonList(props: Props) {
  const dispatch = useDispatch()
  const themeMode = useSelector(appSelector.themeMode)

  const handleClickThemeButton = () => {
    dispatch(setThemeMode({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
  }
  return (
    <Container>
      {headerButtonList.map((item, index) => (
        <Button key={index}>{item.name}</Button>
      ))}
      <Button onClick={handleClickThemeButton}>{themeMode}</Button>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  gap: 10px;
`
