import { GetServerSideProps } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextSeo } from 'next-seo'

import RegisterContainer from '@/components-pages/auth/RegisterContainer'

export default function Register() {
  return (
    <>
      <NextSeo title="회원가입" noindex />
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
