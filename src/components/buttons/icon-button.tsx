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

interface CopyProps {
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
}

export const IconButton = ({ onClick, children }: CopyProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
