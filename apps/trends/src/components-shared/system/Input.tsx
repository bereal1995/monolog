import styled from '@emotion/styled'
import React, { forwardRef } from 'react'

import { colors } from '@/lib/colors'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string | null
}

const Input = forwardRef<HTMLInputElement, Props>(({ errorMessage, ...rest }: Props, ref) => {
  return (
    <>
      <StyledInput {...rest} ref={ref} />
      {errorMessage ? <Message>{errorMessage}</Message> : null}
    </>
  )
})
Input.displayName = 'Input'

const StyledInput = styled.input`
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  border: 1px solid ${colors.gray2};
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  color: ${colors.gray5};
  transition: all 0.25s ease-in-out;

  &:focus {
    border-color: ${colors.primary};
  }
  &::placeholder {
    color: ${colors.gray2};
  }
  &:disabled {
    background: ${colors.gray0};
    color: ${colors.gray3};
  }
`

const Message = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: red;
`

export default Input
