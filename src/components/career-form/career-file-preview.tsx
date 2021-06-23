import styled from 'styled-components';
import React from 'react';
import { Clear } from '../icons/clear';
import { Checkmark } from '../icons/checkmark';
import { theme } from '../layout/theme';

export const FilePreview = ({ index, file, onClick }) => {
  return (
    <Preview>
      <Container>
        <CheckmarkBackground>
          <Checkmark />
        </CheckmarkBackground>
        <FileName className="name">{(file as File).name}</FileName>
      </Container>
      <Button onClick={(event) => onClick(event, index)}>
        <Clear />
      </Button>
    </Preview>
  );
};

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  justify-content: left;
  align-items: center;
  width: calc(100% - 26px);
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

const Preview = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  border-radius: 4px;
  padding: 25px 24px;
  background: rgba(122, 143, 204, 0.2);
  overflow: ellipsis;
  line-height: 150%;
`;
