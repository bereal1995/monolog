import { useDispatch } from 'react-redux'

import { useTheme } from './useTheme'

import { enableDarkMode, enableLightMode } from '@/src/modules/app/reducer'

export function useToggleTheme() {
  const dispatch = useDispatch()
  const themeMode = useTheme()

  const save = (value: 'light' | 'dark') => {
    localStorage.setItem('themeMode', value) // For CSR
    document.cookie = `themeMode=${value}; path=/;` // For SSR
  }

  const toggle = () => {
    if (!themeMode) return
    if (themeMode === 'dark') {
      dispatch(enableLightMode())
      save('light')
    } else {
      dispatch(enableDarkMode())
      save('dark')
    }
  }

  return [themeMode, toggle] as const
}
