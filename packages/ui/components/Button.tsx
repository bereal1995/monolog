import * as React from "react";
import styled from '@emotion/styled';
import colors from "../constants/colors";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const Button = ({ fullWidth = false, children, ...rest }: ButtonProps) => {
  if (!children) return null;

  return (
    <StyledButton
      fullWidth={fullWidth}
      {...rest}
    >
      <span>{children}</span>
    </StyledButton>
  );
};

const StyledButton = styled.button<{fullWidth: boolean}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  padding: 6px 12px;
  border: 0 solid transparent;
  border-radius: 4px;
  background-color: ${colors.blue500};
  color: ${colors.white};
  font-size: 17px;
  font-weight: 600;
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
  &:active {
    background-color: ${colors.blue700};
  }
`;