import React from 'react'
import styled from '@emotion/styled'

import Header from '@/components/header'

interface Props {
  children: React.ReactNode;
}

export default function Layout ({ children }: Props) {
  return (
    <Container>
      <Header/>
      {children}
    </Container>
  )
}

const Container = styled.div`
  
`
