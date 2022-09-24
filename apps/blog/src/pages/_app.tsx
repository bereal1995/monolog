import type { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import { Global } from '@emotion/react'

import ThemeProvider from '@/styles/ThemeProvider'
import Layout from '@/src/layout'
import AuthProvider from '@/components/auth/AuthProvider'
import themeStyle from '@/styles/themeStyle'
import resetStyle from '@/styles/resetStyle'
import { wrapper } from '@/modules/store'

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
      <ThemeProvider>
        <Global styles={resetStyle} />
        <Global styles={themeStyle} />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </AuthProvider>
  )
}

export default wrapper.withRedux(App)
