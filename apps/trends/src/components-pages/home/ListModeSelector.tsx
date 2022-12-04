import { FaHotjar } from 'react-icons/fa'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BiTime } from 'react-icons/bi'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import styled from '@emotion/styled'

import { css } from '@emotion/react'

import { ListMode } from '@/lib/api/types'
import { colors } from '@/lib/colors'

interface Props {
  mode: ListMode
  onSelectMode(mode: ListMode): void
}

function ListModeSelector({ mode, onSelectMode }: Props) {
  const [elementSizes, setElementSizes] = useState([0, 0, 0])
  const setElementSizeOfIndex = useCallback((indeX: number, size: number) => {
    setElementSizes((prev) => {
      const next = [...prev]
      next[indeX] = size
      return next
    })
  }, [])
  const modeProps = useMemo(
    () =>
      [
        { mode: 'trending', name: '트렌딩', icon: <FaHotjar /> },
        { mode: 'recent', name: '최신', icon: <BiTime /> },
        { mode: 'past', name: '과거', icon: <AiOutlineCalendar /> },
      ] as const,
    [],
  )
  const currentIndex = useMemo(() => modeProps.findIndex((p) => p.mode === mode), [modeProps, mode])
  const indicatorWidth = elementSizes[currentIndex]
  const indicatorLeft = useMemo(() => {
    const gaps = currentIndex * 16
    const sizes = elementSizes.slice(0, currentIndex).reduce((a, b) => a + b, 0)
    return gaps + sizes
  }, [currentIndex, elementSizes])

  return (
    <Block>
      {modeProps.map((props, index) => (
        <ListModeItem key={props.name} {...props} currentMode={mode} index={index} onSelectMode={onSelectMode} onUpdateSize={setElementSizeOfIndex} />
      ))}
      {indicatorWidth === 0 ? null : <Indicator layout style={{ left: indicatorLeft, width: indicatorWidth }} />}
    </Block>
  )
}

const useIsomorphicEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

function ListModeItem({
  mode,
  currentMode,
  icon,
  name,
  index,
  onSelectMode,
  onUpdateSize,
}: Props & {
  currentMode: ListMode
  icon: React.ReactNode
  name: string
  index: number
  onUpdateSize(index: number, size: number): void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicEffect(() => {
    if (!ref.current) return
    onUpdateSize(index, ref.current.clientWidth)
  }, [index, onUpdateSize])

  return (
    <Mode isActive={mode === currentMode} onClick={() => onSelectMode(mode)} ref={ref}>
      {icon}
      {name}
    </Mode>
  )
}

const Block = styled.div`
  position: relative;
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`

const Mode = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.gray3};
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }

  ${(props) =>
    props.isActive &&
    css`
      font-weight: 600;
      color: ${colors.primary};
    `}
`

const Indicator = styled(motion.div)`
  position: absolute;
  bottom: -8px;
  left: 0;
  height: 2px;
  background: ${colors.primary};
  border-radius: 1px;
`

export default ListModeSelector
