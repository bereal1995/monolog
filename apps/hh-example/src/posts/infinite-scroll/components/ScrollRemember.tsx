import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

import useIsomorphicLayoutEffect from '@/src/hooks/useIsomorphicLayoutEffect'

interface Props {
  children?: React.ReactNode
}

interface ScrollPosition {
  [path: string]: number
}
const scrollPosition = {} as ScrollPosition

function ScrollRemember({ children }: Props) {
  const router = useRouter()

  const handleRouteChange = useCallback(() => {
    scrollPosition[router.asPath] = window.scrollY
  }, [router.asPath])

  const handleRouteComplete = useCallback(() => {
    window.scrollTo(0, scrollPosition[router.asPath] || 0)
  }, [router.asPath])

  useIsomorphicLayoutEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [handleRouteChange, router.events, handleRouteComplete])

  return <>{children}</>
}

export default ScrollRemember
