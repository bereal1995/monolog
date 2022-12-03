import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'

interface Props {
  children: React.ReactNode
}

function FullHeightPage({ children }: Props) {
  return (
    <>
      <Page>{children}</Page>
      <Global
        styles={css`
          html,
          body {
            height: 100%;
          }
        `}
      />
    </>
  )
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export default FullHeightPage
