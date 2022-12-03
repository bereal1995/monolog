import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { forwardRef, useState } from 'react'

import Input, { type Props as InputProps } from './Input'

import { colors } from '@/lib/colors'

interface Props extends InputProps {
  label: string
}

const LabelInput = forwardRef<HTMLInputElement, Props>(({ label, onBlur, onFocus, ...rest }: Props, ref) => {
  const [focused, setFocused] = useState(false)
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(e)
    setFocused(true)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e)
    setFocused(false)
  }

  return (
    <Block>
      <Label focused={focused}>{label}</Label>
      <Input onFocus={handleFocus} onBlur={handleBlur} {...rest} ref={ref} />
    </Block>
  )
})
LabelInput.displayName = 'LabelInput'

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label<{ focused?: boolean }>`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 1.5;
  color: ${colors.gray4};
  font-weight: 600;
  transition: all 0.25s ease-in-out;
  ${(props) =>
    props.focused &&
    css`
      color: ${colors.primary};
    `}
`

export default LabelInput
