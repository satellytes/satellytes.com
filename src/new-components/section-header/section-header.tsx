import React from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../components/typography/typography-v2';
import { up } from '../../components/style-utils/breakpoint';

interface BlogHeaderProps {
  /**
   * A short label above the headline
   */
  kicker?: string;
  /**
   * The headline for the given section
   */
  headline: string;
  /**
   * The actual text content
   */
  children?: React.ReactNode;
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

export const SectionHeader = (props: BlogHeaderProps) => {
  return (
    <div>
      {props.kicker && <KickerStyled>{props.kicker}</KickerStyled>}
      <HeadlineStyled>{props.headline}</HeadlineStyled>
      <ContentStyled>{props.children}</ContentStyled>
    </div>
  );
};
