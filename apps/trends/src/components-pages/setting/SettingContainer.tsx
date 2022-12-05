import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'

import TabLayout from '@/components-shared/layouts/TabLayout'
import { useLogout } from '@/hooks/useLogout'
import { colors } from '@/lib/colors'

function SettingContainer() {
  const logout = useLogout()

  return (
    <TabLayout>
      <Block>
        <ListWrapper>
          <ListItemLink href="/setting/account">내 계정</ListItemLink>
          <ListItem onClick={logout}>로그아웃</ListItem>
        </ListWrapper>
      </Block>
    </TabLayout>
  )
}

const Block = styled.div`
  flex: 1;
  background: ${colors.gray0};
`

const ListWrapper = styled.div`
  div + div {
    border-top: 1px solid ${colors.gray0};
  }
`

const listItemStyles = css`
  padding: 16px;
  background: white;
  color: ${colors.gray5};
  &:active {
    opacity: 0.7;
  }
`
const ListItem = styled.div`
  ${listItemStyles}
  cursor: pointer;
`

const ListItemLink = styled(Link)`
  ${listItemStyles}
  display: block;
  text-decoration: none;
`

export default SettingContainer
