import { css, Global, useTheme } from '@emotion/react'

import resetStyle from '@/styles/resetStyle'

interface Props {}

export default function GlobalStyle(props: Props) {
  const theme = useTheme()
  return (
    <>
      <Global styles={resetStyle} />
      <Global
        styles={css`
          body {
            background-color: ${theme.background};
            color: ${theme.textPrimary};
            a {
              color: ${theme.textSecondary};
            }
            transition: background-color 0.3s ease-in-out;
          }
        `}
      />
    </>
  )
}
