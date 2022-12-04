import styled from '@emotion/styled'
import React from 'react'

import Button from '@/components-shared/system/Button'
import { colors } from '@/lib/colors'
import { mediaQuery } from '@/lib/media'

interface Props {
  description?: string
  children: React.ReactNode
  buttonText: string
  onSubmit(e: React.FormEvent<HTMLFormElement>): void
}

function WriteFormTemplate({ description, children, buttonText, onSubmit }: Props) {
  return (
    <StyledForm onSubmit={onSubmit}>
      {description && <h3>{description}</h3>}
      <Content>{children}</Content>
      <Button>{buttonText}</Button>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;

  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: ${colors.gray5};
    line-height: 1.5;
    font-size: 18px;
  }

  ${mediaQuery(500)} {
    align-self: center;
    justify-content: center;
    width: 460px;
  }
`

const Content = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;

  ${mediaQuery(500)} {
    flex: initial;
    padding-bottom: 24px;
  }
`

export default WriteFormTemplate
