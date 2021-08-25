import React from 'react';
import { CopyIcon } from '../icons/copy';
import copy from 'copy-to-clipboard';
import styled from 'styled-components';

interface CodeBlockProps {
  children: React.ReactNode;
}

const StyledCodeBlock = styled.pre`
  background: #f5f2f0;
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
  position: relative;

  > svg {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    &:active {
      border: 2px solid #f5f2f0;
    }
  }
`;

export const CodeBlock = (props: CodeBlockProps) => {
  const copyCodeBlock = (event) => {
    const codeNode = event.currentTarget.previousSibling;
    const { innerText } = codeNode;
    copy(innerText);
  };

  return (
    <StyledCodeBlock>
      {props.children}
      <CopyIcon onClick={copyCodeBlock} />
    </StyledCodeBlock>
  );
};
