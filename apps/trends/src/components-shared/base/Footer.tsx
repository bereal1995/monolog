import styled from '@emotion/styled'

import FooterTabItem from './FooterTabItem'

import { colors } from '@/lib/colors'
import { mq } from '@/lib/media'

function Footer() {
  return (
    <StyledFooter>
      <FooterTabItem icon="home" to={'/'} />
      <FooterTabItem icon="search" to={'/search'} />
      <FooterTabItem icon="plus-circle" to={'/write'} />
      <FooterTabItem icon="bookmark" to={'/bookmarks'} />
      <FooterTabItem icon="setting" to={'/setting'} />
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  ${mq({
    display: ['flex', 'none'],
  })}
  display: flex;
  height: 56px;
  border-top: 1px solid ${colors.gray0};
`

export default Footer
