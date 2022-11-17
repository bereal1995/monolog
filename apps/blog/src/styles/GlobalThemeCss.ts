import { css } from '@emotion/react'
import { themedPalette, themes } from 'ui/theme'

const GlobalThemeCss = css`
  body {
    ${themes.light};
    background-color: ${themedPalette.background};
    color: ${themedPalette.textPrimary};
    a {
      color: ${themedPalette.textSecondary};
    }
  }

  @media (prefers-color-scheme: dark) {
    body {
      ${themes.dark};
    }
  }

  body[data-theme='light'] {
    ${themes.light};
  }

  body[data-theme='dark'] {
    ${themes.dark};
  }
`

export default GlobalThemeCss
