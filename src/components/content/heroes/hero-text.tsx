import styled, { css } from 'styled-components';
import { down, up } from '../../support/breakpoint';
import { TextStyles } from '../../typography';
import React from 'react';
import { ReactNode } from 'react';

export interface HeroWithText {
  title: string;
  hideMobileText?: boolean;
  children?: ReactNode;
}

export const HeroText = ({ title, children, hideMobileText }: HeroWithText) => {
  return (
    <HeroTextStyled>
      <Headline>{title}</Headline>
      <Text hideMobileText={hideMobileText}>{children}</Text>
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
  ${TextStyles.headlineL}
  margin: 0;
  margin-bottom: 24px;

  ${up('md')} {
    margin-bottom: 32px;
    ${TextStyles.headlineXL}
  }
`;

const Text = styled.div<{ hideMobileText?: boolean }>`
  ${TextStyles.textR}

  ${up('md')} {
    ${TextStyles.textL}
  }

  ${({ hideMobileText }) =>
    hideMobileText &&
    css`
      ${down('md')} {
        display: none;
      }
    `}
`;
