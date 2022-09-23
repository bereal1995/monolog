import React from 'react'

import Header from '@/components/header'

interface Props {
  children: React.ReactNode;
}

export default function Layout ({ children }: Props) {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}
