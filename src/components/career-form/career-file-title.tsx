import { Checkmark } from '../icons/checkmark';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../layout/theme';

export const FileTitleWrapper = ({ file }: { file: File }) => {
  return (
    <Container>
      <CheckmarkBackground>
        <Checkmark />
      </CheckmarkBackground>
      <FileName className="name">{file.name}</FileName>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  justify-content: left;
  align-items: center;
`;

const CheckmarkBackground = styled.div`
  width: 16px;
  height: 16px;
  background: ${theme.palette.primary.main};
  border-radius: 28px;

  svg {
    display: block;
    margin: auto;
    margin-top: 4px;
    width: 16px;
  }
`;

const FileName = styled.div`
  margin-left: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
