import React from 'react';
import styled from 'styled-components';
import { up } from '../support/breakpoint';
import { theme } from '../layout/theme';
import { Swoosh } from './icons/header-icons/swoosh';
import { HEADER_HEIGHT } from '../layout/header/header';
import { Link } from './links/links';

const TitleContainer = styled.div`
  margin-top: calc(96px + ${HEADER_HEIGHT});
  margin-bottom: 40px;

  ${up('md')} {
    margin-top: calc(160px + ${HEADER_HEIGHT});
  }
`;

export const PageTitleSwoosh = styled(Swoosh)`
  position: absolute;
  left: 3px;

  top: -8px;
  height: 10px;
  width: 33px;

  ${up('md')} {
    width: 49px;
    top: -16px;
    height: 15px;
  }
`;

export const StyledTitle = styled.h1`
  position: relative;
  font-size: 48px;
  line-height: 110%;
  margin: 0;

  ${up('md')} {
    font-size: 72px;
  }
`;

export const PageTitle = (props) => {
  return (
    <TitleContainer className={props.className}>
      <StyledTitle>
        <PageTitleSwoosh />
        {props.children}
      </StyledTitle>
    </TitleContainer>
  );
};

export const SubTitle = styled.h3`
  font-size: 36px;
  line-height: 110%;
  margin: 0;
`;

export const TextTitle = styled.h4`
  font-size: 28px;
  line-height: 110%;
  margin: 0;
`;

export const SmallTitle = styled.h5`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 110%;
  margin: 0;
`;

/**
 *
 * Text
 *
 */
export const Text = styled.p`
  font-size: 16px;
  line-height: 150%;

  margin-top: 0;
  margin-bottom: 16px;
`;

export const CaptionText = styled.p`
  font-size: 12px;
  line-height: 110%;
  font-weight: bold;

  color: #668cff;
`;

export const Topline = styled.p`
  font-weight: bold;
  font-size: 16px;
  line-height: 110%;
  margin: 0;

  color: ${theme.palette.text.topline};
`;

export const ImageCardSubtitle = styled.p`
  font-size: 14px;
  line-height: 150%;
`;

export const TextLink = styled(Link)<{ small?: boolean }>`
  display: inline-block;
  color: ${theme.palette.text.link.default};

  font-size: ${(props) => (props.small ? '14px' : '16px')};
  line-height: 150%;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: ${theme.palette.text.link.hover};
    text-decoration: underline;
  }
`;
