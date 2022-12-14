import React from 'react'
import styled from '@emotion/styled'
import { Layout } from 'antd'
import Link from 'next/link'

const { Header, Content } = Layout
interface Props {
  title: string
  children: React.ReactNode
}

function DefaultLayout({ title, children }: Props) {
  return (
    <Block>
      <StyledHeader>
        <Link href="/">
          <a>hhxdragon</a>
        </Link>
        <h2>{title}</h2>
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
    </Block>
  )
}

const Block = styled(Layout)`
  height: 100%;
`

const StyledHeader = styled(Header)`
  display: flex;
  gap: 10px;
  h2 {
    color: #fff;
  }
`

const StyledContent = styled(Content)`
  overflow: auto;
  flex: 1 !important;
`

export default DefaultLayout
