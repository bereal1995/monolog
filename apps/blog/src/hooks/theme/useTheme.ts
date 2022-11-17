import { useSelector } from 'react-redux'

import { appSelector } from '@/modules/app/reducer'

export function useTheme() {
  const appState = useSelector(appSelector.root)
  const theme = (() => {
    if (appState.systemThemeMode === 'not-ready') return 'light' // 시스템 테마가 준비되지 않았을 때
    if (appState.themeMode !== 'default') return appState.themeMode // store에 저장된 테마 모드가 있을 때
    return appState.systemThemeMode // 시스템테마가 있고 스토어에 저장된 테마가 없을 때 (default)
  })()

  return theme
}
