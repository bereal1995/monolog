import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import RegisterContainer from '@/components-pages/auth/RegisterContainer'

export default function Register() {
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <RegisterContainer />
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
