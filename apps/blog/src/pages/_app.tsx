import type { ReactElement, ReactNode } from 'react'
import { AppProps } from "next/app";
import { NextPage } from "next";

import Layout from '@/src/layout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return getLayout(<Component {...pageProps} />)
}