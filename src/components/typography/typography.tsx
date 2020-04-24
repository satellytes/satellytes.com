import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';

const H1 = styled.h1`
  font-size: 32px;
  line-height: 110%;

  ${up('md')} {
    font-size: 72px;
  }
`;

const H2 = styled.h1`
  font-size: 48px;
  line-height: 110%;

  ${up('md')} {
    font-size: 72px;
  }
`;

const Body = styled.div``;

type Variant = 'h1' | 'h2';

interface TypographyProps extends HTMLAttributes<{}> {
  variant: Variant;
}

export const Typography: React.FC<TypographyProps> = (props) => {
  let Component;

  switch (props.variant) {
    case 'h1':
      Component = H1;
      break;
    case 'h2':
      Component = H2;
      break;
    default:
      Component = Body;
  }

  return <Component {...props}>{props.children}</Component>;
};
