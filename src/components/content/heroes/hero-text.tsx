import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { TextStyles } from '../../typography';
import React from 'react';
import { ReactNode } from 'react';

export interface HeroWithText {
  title: string;
  children?: ReactNode;
}

export const HeroText = ({ title, children }: HeroWithText) => {
  return (
    <HeroTextStyled>
      <Headline>{title}</Headline>
      <Text>{children}</Text>
    </HeroTextStyled>
  );
};

const HeroTextStyled = styled.div`
  padding: 48px 0;
  color: #fff;

  ${up('md')} {
    padding: 160px 0;
  }
`;

const Headline = styled.h1`
  white-space: pre-line;
  ${TextStyles.headlineL}
  margin: 0;
  margin-bottom: 24px;

  ${up('md')} {
    margin-bottom: 32px;
    ${TextStyles.headlineXL}
  }
`;

const Text = styled.div`
  ${TextStyles.textR}

  ${up('md')} {
    ${TextStyles.textL}
  }
`;
