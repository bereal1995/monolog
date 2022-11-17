import { useRef } from 'react'
import styled from '@emotion/styled'

interface Props {}

function ThemeToggleButton(props: Props) {
  const spinnerRef = useRef<HTMLDivElement>(null)
  const rotate = useRef<number>(0)

  const spinnerRotate = () => {
    if (spinnerRef.current) {
      rotate.current = rotate.current + -180
      spinnerRef.current.style.transform = `rotate(${rotate.current}deg)`
    }
  }

  const handleClickThemeButton = () => {
    spinnerRotate()
  }

  return (
    <Block onClick={handleClickThemeButton}>
      <Spinner ref={spinnerRef}>
        <span className="light_ic">🌝</span>
        <span className="dark_ic">🌚</span>
      </Spinner>
    </Block>
  )
}

const Block = styled.button`
  overflow: hidden;
  display: block;
  width: 60px;
  height: 30px;
  padding: 0;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`

const Spinner = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  transition: transform 0.67s linear;
  span {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
  }
  .dark_ic {
    top: 30px;
    transform: rotate(180deg);
  }
`

export default ThemeToggleButton
