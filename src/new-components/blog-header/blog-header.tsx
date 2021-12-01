import React from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../components/typography/typography-v2';
import { up } from '../../components/breakpoint/breakpoint';

interface BlogHeaderProps {
  /**
   * A short label above the headline
   */
  kicker?: string;
  /**
   * The headline for the given blog post
   */
  headline: string;
  /**
   * A note about the author and/or time
   */
  byline?: string;
  /**
   * The lead content to introduce the reader to the blog post
   */
  children?: React.ReactNode;
}

const KickerStyled = styled.span`
  ${TextStyles.toplineR}
  display: block;
  color: #3e61ee;
  margin-bottom: 16px;
`;

const HeadlineStyled = styled.h1`
  ${TextStyles.headlineXL}
  margin: 0;
  color: #202840;
  margin-bottom: 16px;
`;

const BylineStyled = styled.span`
  color: #808080;
`;

const LeadStyled = styled.div`
  ${TextStyles.textL}
  margin-top: 48px;

  ${up('md')} {
    margin-top: 32px;
  }
`;

export const BlogHeader = (props: BlogHeaderProps) => {
  return (
    <header>
      {props.kicker && <KickerStyled>{props.kicker}</KickerStyled>}
      <HeadlineStyled>{props.headline}</HeadlineStyled>
      {props.byline && <BylineStyled>{props.byline}</BylineStyled>}
      <LeadStyled>{props.children}</LeadStyled>
    </header>
  );
};
