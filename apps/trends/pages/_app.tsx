import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DefaultSeo } from 'next-seo'
import { appWithTranslation } from 'next-i18next'

import { useDefaultSeo } from '@/hooks/useDefaultSeo'
import { Global } from '@emotion/react'
import GlobalStyle from '@/styles/GlobalStyle'

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient())
  const defaultSeo = useDefaultSeo()

  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <Global styles={GlobalStyle} />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default appWithTranslation(App)
