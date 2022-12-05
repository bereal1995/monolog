import type { AppContext, AppProps } from 'next/app'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Global } from '@emotion/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import GlobalStyle from '@/styles/GlobalStyle'
import GlobalDialog from '@/components-shared/base/GlobalDialog'
import { setClientCookie } from '@/lib/api/client'

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 5,
          },
        },
      }),
  )
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <>
      <Global styles={GlobalStyle} />
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <GlobalDialog />
          </Hydrate>
        </QueryClientProvider>
      </SessionContextProvider>
    </>
  )
}

App.getInitialProps = async (context: AppContext) => {
  const cookie = context.ctx.req?.headers.cookie
  if (!cookie) return {}

  setClientCookie(cookie)

  return {}
}

export default App
