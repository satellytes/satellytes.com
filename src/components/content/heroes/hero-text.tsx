import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { TextStyles } from '../../typography';
import React from 'react';
import { ReactNode } from 'react';
import { CONTENT_SPACE_LEFT_RIGHT } from '../../layout/theme';

export interface HeroWithText {
  title: string;
  kicker?: string;
  children?: ReactNode;
}

export const HeroText = ({ title, children, kicker }: HeroWithText) => {
  return (
    <HeroTextStyled>
      {kicker && <Kicker>{kicker}</Kicker>}
      <Headline>{title}</Headline>
      <Text>{children}</Text>
    </HeroTextStyled>
  );
};

const HeroTextStyled = styled.div`
  padding: 48px 0;
  color: #fff;

  ${up('md')} {
    padding: 160px ${CONTENT_SPACE_LEFT_RIGHT}px;
  }
`;

const Kicker = styled.span`
  ${TextStyles.toplineR}
  display: block;
  margin-bottom: 16px;
  text-transform: capitalize;
`;

const Headline = styled.h1`
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
