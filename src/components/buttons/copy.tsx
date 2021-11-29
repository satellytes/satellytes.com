import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  border-radius: 30px;

  height: 24px;
  width: 24px;

  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);

  padding: 0;

  &:hover {
    background: #3e61ee;
  }
`;

const handleClick = (text: string) => {
  navigator.clipboard.writeText(text);
};

interface CopyProps {
  textToBeCopied: string;
}

export const Copy = ({ textToBeCopied }: CopyProps) => {
  return (
    <StyledButton onClick={() => handleClick(textToBeCopied)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 9.7L12 13.9L18 9.7L12 5.5L6 9.7Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.57143 12.5L6 14.3L12 18.5L18 14.3L15.4286 12.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </StyledButton>
  );
};
