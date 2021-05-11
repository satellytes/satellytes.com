import React from 'react';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { theme } from '../layout/theme';
import { Swoosh } from '../icons/swoosh';
import { HEADER_HEIGHT } from '../header/header';
import { Link } from '../links/links';

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

export const SectionTitle = styled.h2`
  font-size: 48px;
  line-height: 110%;
  font-weight: bold;

  ${up('md')} {
    font-size: 72px;
  }
`;

export const SubTitle = styled.h3`
  font-size: 32px;
  line-height: 110%;

  margin-top: 80px;
  margin-bottom: 40px;

  ${up('md')} {
    font-size: 48px;
  }
`;

export const TextTitle = styled.h4`
  font-size: 24px;
  line-height: 110%;

  margin-top: 80px;
  margin-bottom: 24px;

  ${up('md')} {
    font-size: 32px;
    margin-top: 160px;
  }
`;

export const SmallTitle = styled.h5`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 110%;

  margin: 32px 0 8px 0;
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

export const LargeText = styled.p`
  font-size: 24px;
  font-weight: normal;
  line-height: 110%;

  margin-top: 0;
  margin-bottom: 40px;

  ${up('md')} {
    font-size: 32px;
  }
`;

export const CaptionText = styled.p`
  font-size: 12px;
  line-height: 110%;
  font-weight: bold;

  color: #668cff;
`;

/**
 *
 * Image Card
 *
 */
export const ImageCardTitleLarge = styled.p`
  font-size: 20px;
  line-height: 110%;
  font-weight: bold;
`;

export const ImageCardTitle = styled.p`
  font-size: 14px;
  line-height: 150%;
  font-weight: bold;
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
  }
`;
