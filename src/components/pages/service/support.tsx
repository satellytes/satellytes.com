import {
  Illustration,
  IllustrationSize,
} from '../../ui/illustration/illustration';
import React from 'react';
import styled from 'styled-components';
import { Expandable } from '../../ui/expandable/expandable';
import { TextStyles } from '../../typography';
import { up } from '../../support/breakpoint';

export const IntroLayout = styled.div`
  ${up('md')} {
    display: flex;
  }
`;
export const IllustrationStyled = styled(Illustration)`
  margin-left: auto;

  ${up('md')} {
    flex: 0 0 auto;
    padding-left: 108px;
    box-sizing: content-box;
    order: 1;
  }
`;

const HeadlineStyled = styled.h3`
  ${TextStyles.headlineM}
  margin: 0;
  color: #202840;
  margin-bottom: 24px;

  ${up('md')} {
    margin-bottom: 32px;
    ${TextStyles.headlineL}
  }
`;

const ContentStyled = styled.div`
  ${TextStyles.textR}
`;

export const Intro = ({ illustration, headline, children }: any) => (
  <IntroLayout>
    <IllustrationStyled size={IllustrationSize.LARGE} show={illustration} />
    <div>
      <HeadlineStyled>{headline}</HeadlineStyled>
      <ContentStyled>{children}</ContentStyled>
    </div>
  </IntroLayout>
);

export const ExpandableStyled = styled(Expandable)`
  line-height: 150%;
  padding: 0;

  :first-of-type {
    margin-top: 20px;
  }

  & + & {
    margin-top: 10px;
  }
`;
export const UnorderedList = styled.ul`
  line-height: 150%;
  margin: 0;
  padding-left: 0;
  list-style-type: none;
`;

export const DashedListItem = styled.li`
  position: relative;
  padding-left: 16px;

  &:before {
    content: '-';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }
`;
