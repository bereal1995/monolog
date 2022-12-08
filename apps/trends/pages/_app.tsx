import type { AppContext, AppProps } from 'next/app'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserSupabaseClient, Session } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Global } from '@emotion/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DefaultSeo } from 'next-seo'

import SEO from '@/config/seo.config'
import GlobalStyle from '@/styles/GlobalStyle'
import GlobalDialog from '@/components-shared/base/GlobalDialog'
import { setClientCookie } from '@/lib/api/client'
import GlobalBottomSheetModal from '@/components-shared/base/GlobalBottomSheetModal'
import Core from '@/components-shared/base/Core'

const App = ({ Component, pageProps, cookie }: AppProps<{ initialSession: Session; dehydratedState: any }> & { cookie: any }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  setClientCookie(cookie)
  return (
    <>
      <Global styles={GlobalStyle} />
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps?.initialSession}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Hydrate state={pageProps.dehydratedState}>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
            <GlobalDialog />
            <GlobalBottomSheetModal />
            <Core />
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

  return { cookie }
}

export default App
