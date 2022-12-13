import React from 'react'
import styled from '@emotion/styled'

interface Props {
  title: string
  children: React.ReactNode
}

function DefaultLayout({ title, children }: Props) {
  return (
    <Block>
      <h2>{title}</h2>
      {children}
    </Block>
  )
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;

  h2 {
    padding: 5px 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #fcf;
    font-size: 20px;
    font-weight: 600;
  }
`

export default DefaultLayout
