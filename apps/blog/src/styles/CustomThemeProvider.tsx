import { ThemeProvider } from '@emotion/react'
import React, { useEffect } from 'react'
import { getTheme } from 'ui/theme'
import { useDispatch, useSelector } from 'react-redux'

import { appSelector, AppStateType, setThemeMode } from '@/modules/app/reducer'

interface Props extends React.PropsWithChildren<{}> {}

export default function CustomThemeProvider({ children }: Props) {
  const dispatch = useDispatch()
  const isOsDarkMode = typeof window !== 'undefined' && window?.matchMedia('(prefers-color-scheme: dark)').matches
  const themeMode = useSelector(appSelector.themeMode)

  useEffect(() => {
    const localTheme = localStorage.getItem('themeMode') as AppStateType['themeMode']
    if (localTheme) {
      dispatch(setThemeMode({ themeMode: localTheme }))
    } else {
      const themeMode = isOsDarkMode ? 'dark' : 'light'
      dispatch(setThemeMode({ themeMode }))
    }
  }, [isOsDarkMode, dispatch])

  return <ThemeProvider theme={getTheme(themeMode)}>{children}</ThemeProvider>
}
