interface ThemeVariables {
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

type ThemeMode = 'light' | 'dark'
const themeVariables: Record<ThemeMode, ThemeVariables> = {
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

export const buildCssVariables = (variables: ThemeVariables) => {
  const keys = Object.keys(variables) as (keyof ThemeVariables)[]
  return keys.reduce((acc, key) => acc.concat(`--hh-${key.replace(/_/g, '-')}: ${variables[key]};`, '\n'), '')
}

export const themes = {
  light: buildCssVariables(themeVariables.light),
  dark: buildCssVariables(themeVariables.dark),
}

type VariableKey = keyof ThemeVariables
export const cssVar = (name: string) => `var(--hh-${name.replace(/_/g, '-')})`
const variableKeys = Object.keys(themeVariables.light) as VariableKey[]

export const themedPalette: Record<VariableKey, string> = variableKeys.reduce((acc, current) => {
  acc[current] = cssVar(current)
  return acc
}, {} as Record<VariableKey, string>)
