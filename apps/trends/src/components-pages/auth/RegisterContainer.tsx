import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { useRouter } from 'next/router'

import AuthForm, { AuthInputs } from './AuthForm'

import BasicLayout from '@/components-shared/layouts/BasicLayout'

function RegisterContainer() {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const onSubmit = async (data: AuthInputs) => {
    // TODO: 중복가입 부분 확인
    try {
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
          },
        },
      })

      alert('이메일 인증을 완료해주세요.')
      router.push('/')
    } catch (e) {}
  }

  return (
    <BasicLayout title="회원가입" hasBackButton desktopHeaderVisible={false}>
      <AuthForm mode="register" onSubmit={onSubmit} />
    </BasicLayout>
  )
}

export default RegisterContainer
