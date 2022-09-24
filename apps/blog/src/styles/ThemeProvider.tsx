import React, { createContext, useContext, useEffect, useState } from 'react'
import { getTheme } from 'ui/theme'

const defaultMode = 'light'

interface ThemeType {
  background: string
  textPrimary: string
  textSecondary: string
  textDisabled: string
  action: {
    active: string
    hover: string
    selected: string
    disabled: string
    disabledBackground: string
  },
  divider: string
}

interface ThemeContextType {
  theme: ThemeType;
  themeMode: string
  handleThemeChange: (themeMode: string) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: getTheme(defaultMode),
  themeMode: defaultMode,
  handleThemeChange: (themeMode: string) => {}
})

interface Props extends React.PropsWithChildren<{}> { }

export default function ThemeProvider ({ children }: Props) {
  const isOsDarkMode = typeof window !== 'undefined' && window?.matchMedia('(prefers-color-scheme: dark)').matches
  const [themeMode, setThemeMode] = useState(defaultMode)
  const theme = getTheme(themeMode)

  const handleThemeChange = (themeMode: string) => {
    if (typeof window === 'undefined') return

    setThemeMode(themeMode)
    document.body.classList.toggle('dark', themeMode === 'dark')
    localStorage.setItem('theme', themeMode)
  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      handleThemeChange(localTheme)
    } else {
      const themeMode = isOsDarkMode ? 'dark' : 'light'
      handleThemeChange(themeMode)
    }
  }, [isOsDarkMode])

  const contextValue = {
    theme,
    themeMode,
    handleThemeChange
  }
  return (
    <ThemeContext.Provider value={contextValue}>
        {children}
    </ThemeContext.Provider>
  )
}

export const useThemeMode = () => {
  const { theme, themeMode, handleThemeChange } = useContext(ThemeContext)

  try {
    if (!handleThemeChange) {
      throw new Error('Error: ‘handleThemeChange’ is not defined')
    }
  } catch (err) {
    console.log(err)
  }

  return { theme, themeMode, handleThemeChange }
}
