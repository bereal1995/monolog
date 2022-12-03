import Head from 'next/head'

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
