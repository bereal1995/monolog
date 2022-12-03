import React from 'react'
import styled from '@emotion/styled'

import Logo from '../vectors/Logo'

import { colors } from '@/lib/colors'
import { mq } from '@/lib/media'

interface Props {
  title?: React.ReactNode
  headerLeft?: React.ReactNode
  headerRight?: React.ReactNode
  className?: string
}

function MobileHeader({ title = <Logo />, headerLeft, headerRight, className }: Props) {
  return (
    <Block className={className}>
      {headerLeft && <HeaderSide position="left">{headerLeft}</HeaderSide>}
      <Title className="hh-title">{title}</Title>
      {headerRight && <HeaderSide position="right">{headerRight}</HeaderSide>}
    </Block>
  )
}

const Block = styled.header`
  position: relative;
  ${mq({
    display: ['flex', 'none'],
  })}
  align-items: center;
  justify-content: center;
  height: 56px;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom: 1px solid ${colors.gray0};
`

const Title = styled.div`
  color: ${colors.gray5};
  font-size: 18px;
  font-weight: 600;

  svg {
    display: block;
    width: 30px;
    height: 15px;
  }
`
const HeaderSide = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${(props) => props.position}: 16px;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
`

export default MobileHeader
