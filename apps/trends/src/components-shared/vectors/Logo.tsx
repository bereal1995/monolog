import * as React from 'react'
import type { SVGProps } from 'react'

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" {...props}>
    <path
      d="M.75 12V.364h3.16v4.545h4.18V.364h3.16V12H8.09V7.455H3.91V12H.75Zm12 0V.364h3.16v4.545h4.18V.364h3.16V12h-3.16V7.455h-4.18V12h-3.16Z"
      fill="currentColor"
    />
  </svg>
)

export default Logo
