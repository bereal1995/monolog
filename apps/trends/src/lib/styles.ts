import { css, SerializedStyles } from '@emotion/react'

import { colors } from './colors'
import { mq } from './media'

export const hover = (styles: string | SerializedStyles) => css`
  @media (hover: hover) {
    &:hover:not([disabled]) {
      ${styles}
    }
  }
`

export const markdownStyles = css`
  p {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 8px;
    margin-bottom: 8px;
    line-height: 1.5;
    ${mq({
      fontSize: ['14px', '14px', '16px'],
    })}
    margin: 0;
  }
  ul,
  ol {
    margin-top: 8px;
    margin-bottom: 8px;
    ul,
    ol {
      margin: 0;
    }
    p {
      margin: 0;
    }
  }
  a {
    color: ${colors.primary};
  }
`
