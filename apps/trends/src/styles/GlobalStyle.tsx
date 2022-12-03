import { css } from '@emotion/react'

const GlobalStyle = css`
  html {
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  }
  button,
  input {
    font-family: inherit;
  }
  button {
    padding: 0;
    background: none;
    border: none;
    outline: none;
  }

  #__next {
    height: 100%;
  }
`

export default GlobalStyle
