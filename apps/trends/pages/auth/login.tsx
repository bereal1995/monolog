import Head from 'next/head'

import { GetServerSideProps } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import LoginContainer from '@/components-pages/auth/LoginContainer'

export default function Login() {
  return (
    <>
      <Head>
        <title>로그인</title>
      </Head>
      <LoginContainer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {},
  }
}
