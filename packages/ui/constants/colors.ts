export interface ThemeVariables {
  primary: string
  background: string
  textPrimary: string
  textSecondary: string
  textDisabled: string
  active: string
  hover: string
  selected: string
  disabled: string
  disabledBackground: string
  divider: string
}

type Theme = 'light' | 'dark'
export const themeVariables: Record<Theme, ThemeVariables> = {
  light: {
    primary: '#66bb6a',
    background: 'rgb(245, 246, 247)',
    textPrimary: 'rgb(77, 82, 98)',
    textSecondary: '#99A5C0',
    textDisabled: '#C0C8D9',
    active: '#729874',
    hover: '#729874',
    selected: '#729874',
    disabled: '#C0C8D9',
    disabledBackground: '#C0C8D9',
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  dark: {
    primary: '#66bb6a',
    background: '#191919',
    textPrimary: '#ffffffcf',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textDisabled: 'rgba(255, 255, 255, 0.5)',
    active: '#fff',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    divider: 'rgba(255, 255, 255, 0.12)',
  },
}
