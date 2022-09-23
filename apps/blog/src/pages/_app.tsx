import type { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import { Global } from '@emotion/react'

import Layout from '@/src/layout'
import AuthProvider from '@/components/auth/AuthProvider'
import Logo from '@/components/header/Logo'
import resetStyle from '@/styles/resetStyle'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App ({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <AuthProvider>
      <Logo/>
      <Global styles={resetStyle} />
      {getLayout(<Component {...pageProps} />)}
    </AuthProvider>
  )
}
