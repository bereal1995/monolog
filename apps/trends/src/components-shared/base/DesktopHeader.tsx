import styled from '@emotion/styled'
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'

import Button from '../system/Button'
import Logo from '../vectors/Logo'

import SearchArea from './SearchArea'
import UserAddon from './UserAddon'

import { colors } from '@/lib/colors'
import { mq } from '@/lib/media'
import { useSupabaseValue } from '@/states/supabase'

function DesktopHeader() {
  const user = useUser()
  const { profile } = useSupabaseValue()

  return (
    <Block>
      <HomeLink href="/">
        <StyledLogo />
      </HomeLink>
      <Content>
        <Addon></Addon>
        <Addon>
          <SearchArea />
          {user ? (
            <UserAddon username={profile?.username ?? user.user_metadata.user_name ?? 'null'} />
          ) : (
            <Buttons>
              <Button variant="text" size="small" to="/auth/login">
                로그인
              </Button>
              <Button size="small" to="/auth/register">
                회원가입
              </Button>
            </Buttons>
          )}
        </Addon>
      </Content>
    </Block>
  )
}

const Block = styled.div`
  ${mq({
    display: ['none', 'flex'],
  })}
  position: relative;
  align-items: center;
  height: 64px;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom: 1px solid ${colors.gray0};
`

const StyledLogo = styled(Logo)`
  display: block;
  width: 30px;
  height: 15px;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Addon = styled.div`
  display: flex;
  align-items: center;
`

const Buttons = styled.div`
  display: flex;
  gap: 8px;
`

const HomeLink = styled(Link)`
  display: block;
  color: inherit;
`

export default DesktopHeader
