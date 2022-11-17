import { themeVariables, ThemeVariables } from '../constants/colors'

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
