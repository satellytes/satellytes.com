import React from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { up } from '../../support/breakpoint';

interface SectionHeaderProps {
  /**
   * A short label above the headline
   */
  kicker?: string;
  /**
   * The headline for the given section
   */
  headline: string;
  /**
   * html tag as which the headline will be rendered
   * @default "h2"
   */
  as?: any;
  /**
   * The actual text content
   */
  children?: React.ReactNode;
  className?: string;
}

const KickerStyled = styled.span`
  ${TextStyles.toplineR}
  display: block;
  color: #3e61ee;
  margin-bottom: 16px;
`;

const HeadlineStyled = styled.h2`
  ${TextStyles.headlineL}
  margin: 0;
  color: #202840;
  margin-bottom: 24px;

  ${up('md')} {
    margin-bottom: 32px;
    ${TextStyles.headlineXL}
  }
`;

const ContentStyled = styled.div`
  ${TextStyles.textR}

  ${up('md')} {
    ${TextStyles.textL}
  }
`;

export const SectionHeader = (props: SectionHeaderProps) => {
  return (
    <div className={props.className}>
      {props.kicker && <KickerStyled>{props.kicker}</KickerStyled>}
      <HeadlineStyled as={props.as}>{props.headline}</HeadlineStyled>
      <ContentStyled>{props.children}</ContentStyled>
    </div>
  );
};
