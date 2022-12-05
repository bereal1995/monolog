import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'

import SettingContainer from '@/components-pages/setting/SettingContainer'

export default function Setting() {
  return <>
    <NextSeo title="설정" noindex />
    <SettingContainer />
  </>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
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
