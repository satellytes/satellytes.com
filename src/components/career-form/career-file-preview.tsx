import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { Clear } from '../icons/clear';
import { up } from '../breakpoint/breakpoint';

interface FilePreviewProps {
  index: string;
  onClick: (event, index) => void;
  percent?: number;
  children: ReactNode | ReactNode[];
}

export const FilePreview = ({ index, onClick, children }: FilePreviewProps) => {
  return (
    <Preview>
      <Wrapper>{children}</Wrapper>
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
  ${up('md')} {
    margin-left: 20px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 26px);
  ${up('md')} {
    flex-direction: row;
    justify-content: space-between;
  }
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
