import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { forwardRef, useState } from 'react'

import { colors } from '@/lib/colors'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

const LabelTextArea = forwardRef<HTMLTextAreaElement, Props>(({ label, onFocus, onBlur, className, ...rest }: Props, ref) => {
  const [focused, setFocused] = useState(false)
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onFocus?.(e)
    setFocused(true)
  }

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onBlur?.(e)
    setFocused(false)
  }

  return (
    <Block className={className}>
      <Label focused={focused}>{label}</Label>
      <StyledTextArea onFocus={handleFocus} onBlur={handleBlur} {...rest} ref={ref} />
    </Block>
  )
})
LabelTextArea.displayName = 'LabelTextArea'

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

const StyledTextArea = styled.textarea`
  height: 48px;
  padding: 16px;
  border: 1px solid ${colors.gray2};
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  line-height: 1.5;
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

export default LabelTextArea
