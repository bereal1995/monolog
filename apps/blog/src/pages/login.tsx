import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import Head from 'next/head'

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
  const { signInWithEmail, signInWithGithub } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const signIn = ({ email, password }: {email: string, password: string}) => signInWithEmail(email, password)

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
      <form onSubmit={handleSubmit(signIn)}>
        <input type="text"
               placeholder="email"
               {...register('email', {
                 required: true,
                 validate: {
                   isEmail
                 }
               })}
        />
        <input
          type={'password'}
          placeholder={'password'}
          {...register('password', {
            required: true,
            minLength: 6 // supabase 기본 밸리데이션이 6자리 이상
          })}
        />
        <button
          data-test-id={'login-button'}
          type={'submit'}
        >로그인</button>
      </form>

      <button onClick={signInWithGithub}>github 로그인</button>
    </Container>
  )
}

const Container = styled.div``
