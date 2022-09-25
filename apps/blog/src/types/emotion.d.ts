import '@emotion/react'

import { LibTheme } from 'some-lib'

declare module '@emotion/react' {
  export interface Theme {
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
}

declare module '@emotion/react' {
  export interface Theme extends LibTheme {}
}
