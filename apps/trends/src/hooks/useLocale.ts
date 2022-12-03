import { useRouter } from 'next/router'

import { Locale } from '@/types/locale'

export function useLocale() {
  const router = useRouter()
  const { pathname, asPath, query } = router

  const changeLocale = (nextLocale: Locale) => {
    router.push({ pathname, query }, asPath, { locale: nextLocale })
  }

  return {
    changeLocale,
  }
}
