import { css, Global } from '@emotion/react'
import facepaint from 'facepaint'

import resetStyle from './resetStyle'

interface Props {}

const breakpoints = [576, 768, 992, 1200]
export const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`))

export default function GlobalStyle(props: Props) {
  return (
    <>
      <Global styles={resetStyle} />
      <Global
        styles={css`
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
