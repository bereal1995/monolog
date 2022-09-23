import React from 'react'
import Image from 'next/image'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Images from '../../images'

interface Props {
  children?: React.ReactNode
  className?: string
  src: string | undefined
  size?: number | 'large' | 'small',
  shape?: 'circle' | 'square',
}

export default function Avatar ({ children, className, src, size = 32, shape = 'square' }: Props) {
  const width = size === 'large'
    ? 48
    : size === 'small'
      ? 24
      : size

  const img = Images.ose
  return (
    <Container
      className={className}
      css={css`
        width: ${width}px;
        height: ${width}px;
        border-radius: ${shape === 'circle' ? '50%' : '0'};
        overflow: hidden;
        border:1px solid #ddd;
      `}
    >
      <Image
        src={src || img}
        layout={'fill'}
      />
      {children}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`
