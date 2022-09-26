import styled from '@emotion/styled'
import { useForm, Controller } from 'react-hook-form'
import Head from 'next/head'

import { Button, Input } from 'antd'

import { css } from '@emotion/react'

import { useAuth } from '@/components/auth/AuthProvider'

const isEmail = (value: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(value)
}

type FormValues = {
  email: string;
  password: string;
};

export default function Login () {
  const { signInWithEmail, signInWithGithub, signInWithGoogle } = useAuth()
  const { handleSubmit, control, formState: { errors } } = useForm<FormValues>()

  const signIn = ({ email, password }: { email: string, password: string }) => signInWithEmail(email, password)

  return (
    <Container>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (document.cookie && document.cookie.includes('monolog-auth')) {
              window.location.href = "/"
            }
          `
          }}
        />
      </Head>

      <h1>로그인</h1>

      <form onSubmit={handleSubmit(signIn)}>
        <FormLabel>이메일</FormLabel>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            validate: {
              isEmail
            }
          }}
          render={({ field }) => (
            <Input
              css={css`
                margin-bottom: 20px;
              `}
              type="text"
              placeholder="email"
              data-test-id={'email'}
              {...field}
            />
          )}
        />

        <FormLabel>비밀번호</FormLabel>
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
            minLength: 6 // supabase 기본 밸리데이션이 6자리 이상
          }}
          render={({ field }) => (
            <Input
              css={css`
                margin-bottom: 20px;
              `}
              type={'password'}
              data-test-id={'password'}
              placeholder={'password'}
              {...field}
            />
          )}
        />
        <Button
          css={css`
            margin-bottom: 40px;
          `}
          block
          type={'primary'}
          htmlType={'submit'}
          data-test-id={'login-button'}
        >로그인</Button>
      </form>

      <Button
        css={css`
          margin-bottom: 20px;
        `}
        block
        onClick={signInWithGithub}>
        Github 로그인
      </Button>
      <Button
        block
        onClick={signInWithGoogle}>
        Google 로그인
      </Button>
    </Container>
  )
}

const Container = styled.div`
  max-width: 360px;
  margin: 0 auto;

  h1 {
    font-size: 40px;
    margin: 15vh 0 10vh;
    text-align: center;
    .dark & {
      color: #fff;
    }

    .light & {
      color: #000;
    }
  }
`

const FormLabel = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  color: #fff;
`
