import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { Clear } from '../icons/clear';
import { up } from '../breakpoint/breakpoint';
import { rgba } from 'polished';

interface FilePreviewProps {
  index: string;
  onClick: (event, index) => void;
  percent?: number;
  children: ReactNode | ReactNode[];
}

const Preview = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  padding: 19px 16px;
  border-radius: 4px;
  background: ${rgba('#7A8FCC', 0.2)};
  line-height: 150%;

  ${up('md')} {
    padding: 12px 24px;
  }
`;

const Button = styled.button`
  height: 100%;
  margin-top: 3px;

  cursor: pointer;
  background: none;
  border: none;

  ${up('md')} {
    margin-top: 7px;
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
