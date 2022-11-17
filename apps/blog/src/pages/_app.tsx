import type { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import { Provider } from 'react-redux'

import HeadMeta from '@/components/seo/HeadMeta'
import Layout from '@/src/layout'
import AuthProvider from '@/components/auth/AuthProvider'
import { wrapper } from '@/modules/store'
import GlobalStyle from '@/styles/GlobalStyle'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <>
      <HeadMeta />
      <Provider store={store}>
        <AuthProvider>
          <GlobalStyle />
          {getLayout(<Component {...props.pageProps} />)}
        </AuthProvider>
      </Provider>
    </>
  )
}

export default App
