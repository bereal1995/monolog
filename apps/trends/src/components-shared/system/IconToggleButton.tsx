import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'

type Size = 'small' | 'medium'

interface Props {
  isActive?: boolean
  inactiveIcon: React.ReactNode
  activeIcon: React.ReactNode
  size?: Size
  onClick?(): void
}
function IconToggleButton({ isActive, inactiveIcon, activeIcon, size = 'medium', onClick }: Props) {
  return (
    <StyledButton onClick={onClick} size={size}>
      <AnimatePresence initial={false}>
        {isActive ? (
          <SvgWrapper key="fill" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            {activeIcon}
          </SvgWrapper>
        ) : (
          <SvgWrapper key="outline" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            {inactiveIcon}
          </SvgWrapper>
        )}
      </AnimatePresence>
    </StyledButton>
  )
}

const StyledButton = styled.button<{ size: Size }>`
  position: relative;
  display: inline-flex;
  cursor: pointer;
  ${(props) =>
    props.size === 'medium' &&
    css`
      width: 20px;
      height: 20px;
    `}
  ${(props) =>
    props.size === 'small' &&
    css`
      width: 12px;
      height: 12px;
    `}
  padding: 0;
  border: none;
  outline: none;
  background: none;
  svg {
    width: 100%;
    height: 100%;
  }
`

const SvgWrapper = styled(motion.span)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`

export default IconToggleButton
