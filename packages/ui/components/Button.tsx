import * as React from "react";
import styled from '@emotion/styled';
import { css } from "@emotion/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const Button = ({ fullWidth = false, children, ...rest }: ButtonProps) => {
  if (!children) return null;

  return (
    <StyledButton
      css={
        css`
          width: ${fullWidth ? '100%' : 'auto'};
        `
      }
      {...rest}
    >
      <span>{children}</span>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border: 0 solid transparent;
  border-radius: 4px;
  background-color: transparent;
  color: inherit;
  font-size: 17px;
  white-space: nowrap;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.26;
    cursor: not-allowed;
  }
  &:active, &:hover {
    font-weight: 700;
  }
`;
