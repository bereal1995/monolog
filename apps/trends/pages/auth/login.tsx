import Head from 'next/head'

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
