import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const style = css`
  color: hotpink;
`;

const SomeComponent: React.FC = ({ children }) => (
  <div css={style}>
    Some hotpink text.
    {children}
  </div>
);

const anotherStyle = css({
  textDecoration: '',
});

const AnotherComponent: React.FC = () => (
  <div css={anotherStyle}>Some text with an underline.</div>
);

const SomeButton = styled.button`
  background-color: red;
`;

export const EmotionTest: React.FC = () => {
  return (
    <SomeComponent>
      <AnotherComponent />
      <SomeButton>I&apos;m a button</SomeButton>
    </SomeComponent>
  );
};
