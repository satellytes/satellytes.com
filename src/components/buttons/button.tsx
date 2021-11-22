import React from 'react';
import styled, { css } from 'styled-components';

const toplineR = css`
  font-weight: bold;
  font-size: 16px;
  line-height: 110%;
  letter-spacing: -0.01em;
`;

const StyledButton = styled.button`
  height: 40px;

  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);
  border-radius: 30px;
  border: none;

  &:hover {
    background: #3e61ee;
  }
`;

const StyledIcon = styled.span`
  padding-left: 24px;
  padding-right: 16px;
`;

const ButtonText = styled.span`
  padding-left: 16px;

  ${toplineR}
  color: #ffffff;
`;

interface RegularButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
}

const Button = ({ children, onClick }: RegularButtonProps) => {
  return (
    <StyledButton onClick={(event) => onClick?.(event)}>
      <ButtonText>{children}</ButtonText>
      <StyledIcon>
        <svg
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2L5 6L2 10"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </StyledIcon>
    </StyledButton>
  );
};

export default Button;
