import { darkTheme, lightTheme } from "../constants/colors"

export const getTheme = (theme?: string) => {
  if (theme === 'light') {
    return lightTheme
  } else if (theme === 'dark') {
    return darkTheme
  } else {
    return lightTheme
  }
}