import type { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'

import CustomThemeProvider from '@/src/styles/CustomThemeProvider'
import Layout from '@/src/layout'
import AuthProvider from '@/components/auth/AuthProvider'
import { wrapper } from '@/modules/store'
import GlobalStyle from '@/styles/GlobalStyle'

import 'antd/dist/antd.min.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App ({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <AuthProvider>
      <CustomThemeProvider>
        <GlobalStyle/>
        {getLayout(<Component {...pageProps} />)}
      </CustomThemeProvider>
    </AuthProvider>
  )
}

export default wrapper.withRedux(App)
