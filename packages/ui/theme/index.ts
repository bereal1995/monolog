import { darkTheme, lightTheme } from '../constants/colors'

export const getTheme = (themeMode?: 'light' | 'dark') => {
  if (themeMode === 'light') {
    return lightTheme
  } else if (themeMode === 'dark') {
    return darkTheme
  } else {
    return lightTheme
  }
}
