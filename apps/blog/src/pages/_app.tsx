import { ReactElement, ReactNode, useEffect } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import { Provider } from 'react-redux'

import { enableDarkMode, enableLightMode } from '../modules/app/reducer'

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

function App({ Component, ...rest }: NextPage & AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
  const { store, props } = wrapper.useWrappedStore(rest)

  const loadTheme = () => {
    const themeMode = localStorage.getItem('themeMode')
    if (!themeMode) return
    if (themeMode === 'dark') {
      store.dispatch(enableDarkMode())
    } else {
      store.dispatch(enableLightMode())
    }
    // document.body.dataset.themeMode = themeMode
  }

  useEffect(() => {
    loadTheme()
  }, [])

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
