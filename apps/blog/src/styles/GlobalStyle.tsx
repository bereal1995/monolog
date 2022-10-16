import { css, Global, useTheme } from '@emotion/react'
import facepaint from 'facepaint'

import resetStyle from '@/styles/resetStyle'

interface Props {}

const breakpoints = [576, 768, 992, 1200]
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`))

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
            ${mq({
              fontSize: ['14px', '14px', '16px'],
            })}
          }
        `}
      />
    </>
  )
}
