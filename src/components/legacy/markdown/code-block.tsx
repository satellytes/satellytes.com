import React from 'react';
import styled, { CSSProperties } from 'styled-components';
import { onlyText } from '../../support/only-text';
import { Copy } from '../../ui/copy-button/copy-button';

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
  margin: 48px 0;

  &:hover {
    background: #e4e8f3;
  }
`;

const StyledCopy = styled(Copy)`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
`;

export const CodeBlock = (props: CodeBlockProps) => {
  return (
    <CodeBlockWrapper>
      <StyledCopy text={onlyText(props.children)}></StyledCopy>
      <StyledCodeBlock className={props.className} style={props.style ?? {}}>
        {props.children}
      </StyledCodeBlock>
    </CodeBlockWrapper>
  );
};
