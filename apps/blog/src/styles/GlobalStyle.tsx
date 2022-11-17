import { css, Global } from '@emotion/react'
import facepaint from 'facepaint'

import { useThemeEffect } from '@/hooks/theme/useThemeEffect'
import GlobalThemeCss from '@/styles/GlobalThemeCss'
import resetStyle from '@/styles/resetStyle'

interface Props {}

const breakpoints = [576, 768, 992, 1200]
export const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`))

export default function GlobalStyle(props: Props) {
  useThemeEffect()
  return (
    <>
      <Global styles={resetStyle} />
      <Global styles={GlobalThemeCss} />
      <Global
        styles={css`
          html {
            text-size-adjust: none;
          }
          body {
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
