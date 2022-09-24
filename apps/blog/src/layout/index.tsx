import React from 'react'
import styled from '@emotion/styled'

import Header from '@/components/header'
import { useThemeMode } from '@/styles/ThemeProvider'

interface Props {
  children: React.ReactNode;
}

export default function Layout ({ children }: Props) {
  const { theme } = useThemeMode()
  return (
    <Container>
      <Header/>
      {children}
    </Container>
  )
}

const Container = styled.div`
  
`
