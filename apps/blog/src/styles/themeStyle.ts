import { css } from '@emotion/react'
import { darkTheme, lightTheme } from 'ui/constants/colors'

const themeStyle = css`
  body {
    background-color: ${lightTheme.background};
    color: ${lightTheme.textPrimary};
    a {
      color: ${lightTheme.textSecondary};
    }
  }
  body.dark {
    background-color: ${darkTheme.background};
    color: ${darkTheme.textPrimary};
    a {
      color: ${darkTheme.textSecondary};
    }
  }
`

export default themeStyle
