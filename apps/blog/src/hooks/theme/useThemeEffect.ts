import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { appSelector, setSystemTheme } from '@/src/modules/app/reducer'

export function useThemeEffect() {
  const dispatch = useDispatch()
  const themeMode = useSelector(appSelector.themeMode)

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    dispatch(setSystemTheme(systemPrefersDark ? 'dark' : 'light'))
  }, [dispatch])

  useEffect(() => {
    if (themeMode !== 'default') {
      document.body.dataset.themeMode = themeMode
    }
  }, [themeMode])
}
