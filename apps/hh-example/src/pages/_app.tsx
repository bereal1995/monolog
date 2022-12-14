import type { AppProps } from 'next/app'
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextPageContext } from 'next'

import { notification } from 'antd'

import ScrollRemember from '../posts/infinite-scroll/components/ScrollRemember'

import useUnhandledRejectionError from '../posts/error-boundary/hooks/useUnhandledRejectionError'

import { captureUnhandledRejection } from '../posts/error-boundary/lib/sentry'

import GlobalStyle from '@/styles/GlobalStyle'

type PageProps = {
  dehydratedState?: DehydratedState
}
type NotificationType = 'success' | 'info' | 'warning' | 'error'
type ExtendedAppProps<P = {}> = {
  err?: NextPageContext['err']
} & AppProps<P>

function MyApp({ Component, pageProps }: ExtendedAppProps<PageProps>) {
  const [queryClient] = useState(() => new QueryClient())
  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({
    type = 'error',
    message,
    description,
  }: {
    type?: NotificationType
    message: string
    description: string
  }) => {
    api[type]({
      message,
      description,
    })
  }

  useUnhandledRejectionError(({ reason: error }) => {
    captureUnhandledRejection(error)
    openNotification({
      message: '알수없는 에러가 발생하였습니다.',
      description: error.message,
    })
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        <ScrollRemember />
        {contextHolder}
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
