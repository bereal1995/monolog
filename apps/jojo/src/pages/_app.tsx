import type { AppProps } from 'next/app'
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { NextPageContext } from 'next'

import ScrollRemember from '../posts/infinite-scroll/components/ScrollRemember'

import GlobalStyle from '@/styles/GlobalStyle'

type PageProps = {
  dehydratedState?: DehydratedState
}

type ExtendedAppProps<P = {}> = {
  err?: NextPageContext['err']
} & AppProps<P>

function MyApp({ Component, pageProps }: ExtendedAppProps<PageProps>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        <ScrollRemember />
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
