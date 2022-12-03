import facepaint from 'facepaint'

const breakpoints = [500, 768, 1024, 1200, 1440]

export const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`))

export const mediaQuery = (width: number) => `@media (min-width: ${width}px)`
