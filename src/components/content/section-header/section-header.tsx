import React from 'react';
import styled, { css } from 'styled-components';
import { TextStyles } from '../../typography';
import { up } from '../../support/breakpoint';

interface SectionHeaderProps {
  /**
   * A short label above the headline
   */
  kicker?: string;
  /**
   * html tag as which the kicker will be rendered
   * @default "span"
   */
  kickerAs?: any;
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
  /**
   * Large headline
   */
  large?: boolean;
  className?: string;
}

const KickerStyled = styled.span`
  ${TextStyles.toplineS}
  display: block;
  color: #3e61ee;
  margin-bottom: 12px;

  ${up('md')} {
    ${TextStyles.toplineR}
    margin-bottom: 16px;
  }
`;

const HeadlineStyled = styled.h2<{ $large?: boolean }>`
  ${TextStyles.headlineM}
  margin: 0;
  color: #202840;
  margin-bottom: 16px;

  ${up('md')} {
    margin-bottom: 24px;
    ${TextStyles.headlineL}
  }

  ${({ $large }) =>
    $large &&
    css`
      ${TextStyles.headlineL}
      ${up('md')} {
        ${TextStyles.headlineXL}
      }
    `}
`;

const ContentStyled = styled.div`
  ${TextStyles.textSR}

  ${up('md')} {
    ${TextStyles.textR}
  }
`;

export const SectionHeader = (props: SectionHeaderProps) => {
  return (
    <div className={props.className}>
      {props.kicker && (
        <KickerStyled as={props.kickerAs}>{props.kicker}</KickerStyled>
      )}
      <HeadlineStyled $large={props.large} as={props.as}>
        {props.headline}
      </HeadlineStyled>
      <ContentStyled>{props.children}</ContentStyled>
    </div>
  );
};
