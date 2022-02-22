import React from 'react';
import { CopyIcon } from '../icons/markdown-icons/copy';
import copy from 'copy-to-clipboard';
import styled, { CSSProperties } from 'styled-components';
import { onlyText } from '../../support/only-text';

interface CodeBlockProps {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const StyledCodeBlock = styled.pre`
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
  position: relative;
`;

const CodeBlockWrapper = styled.div`
  background: #f5f2f0;
  position: relative;
  cursor: default;

  &:hover {
    background: #e4e8f3;
  }

  > svg {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
    z-index: 2;
    &:active {
      border: 2px solid #f5f2f0;
    }
    &:hover {
      > circle {
        fill: #668cff;
      }
    }
  }
`;

export const CodeBlock = (props: CodeBlockProps) => {
  const copyCodeBlock = () => {
    copy(onlyText(props.children));
  };

  return (
    <CodeBlockWrapper>
      <CopyIcon onClick={copyCodeBlock} />
      <StyledCodeBlock className={props.className} style={props.style ?? {}}>
        {props.children}
      </StyledCodeBlock>
    </CodeBlockWrapper>
  );
};
