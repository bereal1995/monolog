import React from 'react'
import styled from '@emotion/styled'
import { AiFillHome, AiOutlineSearch, AiOutlinePlusCircle, AiFillBook, AiFillSetting } from 'react-icons/ai'
import { css } from '@emotion/react'

import ActiveLink from './ActiveLink'

import { colors } from '@/lib/colors'

const IconMap = {
  home: AiFillHome,
  search: AiOutlineSearch,
  'plus-circle': AiOutlinePlusCircle,
  bookmark: AiFillBook,
  setting: AiFillSetting,
}

interface Props {
  icon: keyof typeof IconMap
  to: string
}
function FooterTabItem({ icon, to }: Props) {
  const iconEl = React.createElement(IconMap[icon])

  return (
    <LinkItem href={to} activeClassName="active">
      {iconEl}
    </LinkItem>
  )
}

const sharedStyled = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 28px;
    height: 28px;
    color: ${colors.gray2};
  }
  &:active {
    svg {
      color: ${colors.primary};
    }
  }
`

const LinkItem = styled(ActiveLink)`
  ${sharedStyled}
  &.active {
    svg {
      color: ${colors.primary};
    }
  }
`

export default FooterTabItem
