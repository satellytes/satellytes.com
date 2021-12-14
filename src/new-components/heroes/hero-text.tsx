import styled from 'styled-components';
import { up } from '../../components/style-utils/breakpoint';
import { TextStyles } from '../../components/typography/typography-v2';
import React from 'react';
import { HeroWithText } from './types';

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
    padding: 108px 0;
  }
`;

const Kicker = styled.span`
  ${TextStyles.toplineR}
  display: block;
  margin-bottom: 16px;
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
