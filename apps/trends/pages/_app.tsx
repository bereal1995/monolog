import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DefaultSeo } from 'next-seo'
import { appWithTranslation } from 'next-i18next'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Global } from '@emotion/react'

import { useDefaultSeo } from '@/hooks/useDefaultSeo'
import GlobalStyle from '@/styles/GlobalStyle'
import GlobalDialog from '@/components-shared/base/GlobalDialog'

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient())
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const defaultSeo = useDefaultSeo()

  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <Global styles={GlobalStyle} />
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <GlobalDialog />
          </Hydrate>
        </QueryClientProvider>
      </SessionContextProvider>
    </>
  )
}

export default appWithTranslation(App)
