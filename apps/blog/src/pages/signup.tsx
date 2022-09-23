import styled from '@emotion/styled'

import { useForm } from 'react-hook-form'

import { useAuth } from '@/components/auth/AuthProvider'

const isEmail = (value: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(value)
}

type FormValues = {
  email: string;
  password: string;
};

export default function SignUp () {
  const { signUp } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const onSubmit = ({ email, password }: {email: string, password: string}) => signUp(email, password)

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type={'submit'}>회원가입</button>
      </form>
    </Container>
  )
}

const Container = styled.div``
