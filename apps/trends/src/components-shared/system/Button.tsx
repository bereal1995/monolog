import React, { forwardRef } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'


import { hover } from '@/lib/styles'
import { colors } from '@/lib/colors'

interface ButtonProps {
  size?: 'small' | 'medium'
  layoutmode?: 'inline' | 'fullWidth'
  variant?: 'primary' | 'secondary' | 'text'
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {
  to?: string
  href?: string
}

const Button = forwardRef<HTMLButtonElement, Props>(({ layoutmode = 'inline', variant = 'primary', size = 'medium', to, href, ...rest }: Props, ref) => {
  if (href) {
    return (
      <StyledAnchor layoutmode={layoutmode} variant={variant} size={size} href={href} className={rest.className} style={rest.style} ref={ref as any}>
        {rest.children}
      </StyledAnchor>
    )
  }
  if (to) {
    return (
      <StyledLink layoutmode={layoutmode} variant={variant} size={size} href={to} className={rest.className} style={rest.style} ref={ref as any}>
        {rest.children}
      </StyledLink>
    )
  }
  return <StyledButton layoutmode={layoutmode} variant={variant} size={size} ref={ref} {...rest} />
})
Button.displayName = 'Button'

const variantStyles = {
  primary: css`
    background: ${colors.primary};
    color: white;
  `,
  secondary: css`
    background: ${colors.secondary};
    color: ${colors.secondaryButtonText};
    ${hover(css`
      opacity: 0.5;
    `)}
  `,
  text: css`
    background: transparent;
    color: ${colors.gray4};
    ${hover(css`
      background: ${colors.gray0};
    `)}
  `,
}

const sizeStyles = {
  small: css`
    height: 36px;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 14px;
  `,
  medium: css`
    height: 48px;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 16px;
  `,
}
const sharedStyles = (props: ButtonProps) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  ${sizeStyles[props.size!]};
  ${variantStyles[props.variant!]};
  border: none;
  border-radius: 4px;
  font-weight: 600;
  transition: filter 0.25s ease-in-out;
  cursor: pointer;

  &:disabled {
    filter: grayscale(0.6);
  }

  ${props.layoutmode === 'fullWidth' &&
    css`
      width: 100%;
    `}
`

const StyledButton = styled.button<ButtonProps>`
  ${sharedStyles}
`

const StyledLink = styled(Link)<ButtonProps>`
  ${sharedStyles}
  text-decoration: none;
`
const StyledAnchor = styled.a<ButtonProps>`
  ${sharedStyles}
  text-decoration: none;
`

export default Button
