import styled from '@emotion/styled'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useForm } from 'react-hook-form'

import { useOpenDialog } from '@/states/dislog'
import { mediaQuery } from '@/lib/media'
import { colors } from '@/lib/colors'
import Button from '@/components-shared/system/Button'
import Input from '@/components-shared/system/Input'
import { useSupabaseData } from '@/hooks/useSupabaseProfile'
import { useSupabaseValue } from '@/states/supabase'
import { unregister } from '@/lib/api/me'

interface UserInput {
  username: string
  avatarUrl: string
}

interface PasswordInput {
  password: string
}

function AccountSetting() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const { profile } = useSupabaseValue()
  const {
    register: registerUser,
    formState: { errors: userErrors },
    handleSubmit: userHandleSubmit,
  } = useForm<UserInput>()
  const {
    register: registerPassword,
    formState: { errors: passwordErrors },
    handleSubmit: passwordHandleSubmit,
  } = useForm<PasswordInput>()
  const openDialog = useOpenDialog()

  const { updateProfile } = useSupabaseData()

  const askUnregister = () => {
    openDialog({
      title: '회원 탈퇴',
      description: '회원 탈퇴를 진행하시겠습니까?',
      mode: 'OK_CANCEL',
      confirmText: '탈퇴',
      cancelText: '취소',
      async onConfirm() {
        try {
          await unregister()
        } catch (e) {}
        window.location.href = '/'
      },
    })
  }

  const updatePassword = async ({ password }: PasswordInput) => {
    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      openDialog({
        title: '실패',
        description: '비밀번호 변경을 실패하였습니다.',
      })
    }
  }

  const updateUser = async ({ username, avatarUrl }: UserInput) => {
    try {
      updateProfile({ username, avatarUrl })
      openDialog({
        title: '성공',
        description: '닉네임 변경 성공!',
      })
    } catch (e) {
      openDialog({
        title: '실패',
        description: '닉네임 변경을 실패하였습니다.',
      })
    }
  }

  const onSubmitPassword = (data: PasswordInput) => {
    updatePassword(data)
  }
  const onSubmitUser = (data: UserInput) => {
    updateUser(data)
  }

  if (!user) return null
  return (
    <Block>
      <div>
        <Title>내 계정</Title>
        <Section>
          <h4>닉네임</h4>
          <form onSubmit={userHandleSubmit(onSubmitUser)}>
            <InputGroup>
              <Input {...registerUser('username')} errorMessage={userErrors.username?.message} defaultValue={profile.username!} />
            </InputGroup>
            <Button variant="secondary" type="submit">
              닉네임 변경
            </Button>
          </form>
        </Section>
        {user.app_metadata.provider === 'email' ? (
          <Section>
            <h4>비밀번호</h4>
            <form onSubmit={passwordHandleSubmit(onSubmitPassword)}>
              <InputGroup>
                <Input {...registerPassword('password')} errorMessage={passwordErrors.password?.message} />
              </InputGroup>
              <Button variant="secondary" type="submit">
                비밀번호 변경
              </Button>
            </form>
          </Section>
        ) : null}
      </div>
      {/* TODO: supabase에서 회원탈퇴는 서버에서만 가능 prisma랑 연동 필요 */}
      {/* <UnregisterWrapper>
        <UnregisterButton onClick={askUnregister}>계정 탈퇴</UnregisterButton>
      </UnregisterWrapper> */}
    </Block>
  )
}

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 32px;
  font-weight: 800;
  color: ${colors.gray5};
  font-size: 48px;
  line-height: 1.5;
`

const Block = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;

  ${mediaQuery(500)} {
    flex: initial;
    max-width: 768px;
    width: 100%;
    margin: 96px auto 0;
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  h4 {
    margin: 0;
    font-size: 16px;
    color: ${colors.gray3};
  }

  & + & {
    margin-top: 32px;
  }
`
const UserName = styled.div`
  font-size: 16px;
  color: ${colors.gray5};
`
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  ${mediaQuery(500)} {
    width: 460px;
  }
`
const UnregisterWrapper = styled.div`
  ${mediaQuery(500)} {
    margin-top: 96px;
  }
`
const UnregisterButton = styled.button`
  font-size: 16px;
  color: #f53e3e;
  text-decoration: underline;
  cursor: pointer;
`

export default AccountSetting
