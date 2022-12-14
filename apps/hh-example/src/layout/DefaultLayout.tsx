import React from 'react'
import styled from '@emotion/styled'
import { Layout } from 'antd'

const { Header, Content } = Layout
interface Props {
  title: string
  children: React.ReactNode
}

function DefaultLayout({ title, children }: Props) {
  return (
    <Block>
      <Header>
        <h2>{title}</h2>
      </Header>
      <Content>{children}</Content>
    </Block>
  )
}

const Block = styled(Layout)`
  h2 {
    color: #fff;
  }
  a {
    width: 100%;
    height: 100%;
  }
`

export default DefaultLayout
