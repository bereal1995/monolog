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
            a,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              color: ${theme.textSecondary};
            }
          }
        `}
      />
    </>
  )
}
