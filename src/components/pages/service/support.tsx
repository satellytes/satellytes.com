import {
  Illustration,
  IllustrationSize,
} from '../../ui/illustration/illustration';
import React from 'react';
import styled from 'styled-components';
import { Expandable } from '../../ui/expandable/expandable';
import { TextStyles } from '../../typography';
import { up } from '../../support/breakpoint';
import { WithAnchorHOC } from '../../layout/with-anchor-hoc';
import { theme } from '../../layout/theme';

export const IntroLayout = styled.div`
  ${up('md')} {
    display: flex;
  }
`;
export const IllustrationStyled = styled(Illustration)`
  display: none;

  ${up('md')} {
    margin-left: auto;
    display: block;
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
`;

const ContentStyled = styled.div`
  margin-top: 16px;
  ${TextStyles.textSR};

  ${up('md')} {
    margin-top: 24px;
    ${TextStyles.textR};
  }
`;

const Kicker = styled.span`
  ${TextStyles.toplineS}
  display: block;
  margin-bottom: 12px;
  color: ${theme.palette.text.topline};
  ${up('md')} {
    ${TextStyles.toplineR}
    margin-bottom: 16px;
  }
`;

export const Intro = ({ illustration, headline, children, kicker }: any) => {
  const HeadlineStyledWithAnchor = WithAnchorHOC(HeadlineStyled);
  return (
    <>
      <IntroLayout>
        <IllustrationStyled size={IllustrationSize.LARGE} show={illustration} />
        <div>
          {kicker && <Kicker>{kicker}</Kicker>}
          <HeadlineStyledWithAnchor>{headline}</HeadlineStyledWithAnchor>
          <ContentStyled>{children}</ContentStyled>
        </div>
      </IntroLayout>
    </>
  );
};

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
  padding-left: 12px;
  list-style-type: none;

  ${up('md')} {
    ${TextStyles.textR};
  }

  > li:before {
    content: '•';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }

  > li {
    position: relative;
    padding-left: 16px;
  }
`;
