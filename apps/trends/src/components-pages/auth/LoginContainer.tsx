import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import { useRouter } from 'next/router'
import { useState } from 'react'

import AuthForm, { AuthInputs } from './AuthForm'

import BasicLayout from '@/components-shared/layouts/BasicLayout'
import Button from '@/components-shared/system/Button'

function LoginContainer() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [errorName, setErrorName] = useState('')
  const next = (router.query.next as string) ?? '/'

  const onSubmit = async (data: AuthInputs) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      setErrorName(error.message)
      return
    }

    router.push(next)
  }
  const onGithubLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        scopes: 'repo',
        redirectTo: `${window.location.origin}${next}`,
      },
    })
  }

  return (
    <BasicLayout title="로그인" hasBackButton desktopHeaderVisible={false}>
      <AuthForm
        mode="login"
        onSubmit={onSubmit}
        errorName={errorName}
        socialLoginButtons={
          <>
            <Button layoutmode="fullWidth" type="button" variant="secondary" onClick={onGithubLogin}>
              Git hub 로그인
            </Button>
          </>
        }
      />
    </BasicLayout>
  )
}

export default LoginContainer
