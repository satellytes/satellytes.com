import React from 'react';
import styled, { css } from 'styled-components';
import {
  TeaserTitle,
  TeaserTitleLarge,
  Text,
  Timestamp,
  Topline,
} from '../typography/typography';
import { Arrow } from '../icons/arrow';
import { theme } from '../layout/theme';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Link } from '../links/links';
import { up } from '../breakpoint/breakpoint';

const TeaserContainer = styled.div`
  cursor: pointer;
  &:hover {
    color: ${theme.palette.text.topline};
    p {
      color: ${theme.palette.text.topline};
    }
  }
`;

const ToplineContainer = styled.div`
  display: flex;
  margin-top: 16px;
  width: 100%;
  justify-content: space-between;
`;

const StyledTeaserTitleLarge = styled(TeaserTitleLarge)<{
  hideOverflow?: boolean;
}>`
  ${(props) =>
    props.hideOverflow &&
    css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `}
`;
const StyledTeaserTitle = styled(TeaserTitle)<{ hideOverflow?: boolean }>`
  ${(props) =>
    props.hideOverflow &&
    css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `}
`;

const TeaserText = styled(Text)<{ hasImage: boolean; hideOverflow?: boolean }>`
  margin-bottom: 22px;
  margin-top: ${(props) => (props.hasImage ? '8px' : '16px')};

  ${(props) =>
    props.hideOverflow &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;

      ${up('md')} {
        -webkit-line-clamp: 2;
      }
    `}
`;

const TeaserImage = styled(GatsbyImage)`
  margin: 0;
  width: 100%;
`;

const Illustration = styled.div`
  margin-bottom: 24px;
`;

interface TeaserProps {
  title: string;
  topline?: string;
  timestamp?: string;
  hideOverflow?: boolean;
  icon?: JSX.Element;
  image?: IGatsbyImageData;
  linkTo: string;
}

export const Teaser: React.FC<TeaserProps> = ({
  topline,
  title,
  timestamp,
  icon,
  image,
  linkTo,
  hideOverflow,
  children,
}) => {
  const largeTitle = !image && !icon;
  return (
    <TeaserContainer>
      <Link to={linkTo}>
        <Illustration>{icon}</Illustration>
        {image && <TeaserImage alt={''} image={image} />}
        {(topline || timestamp) && (
          <ToplineContainer>
            <Topline>{topline}</Topline>
            <Timestamp>{timestamp}</Timestamp>
          </ToplineContainer>
        )}

        {largeTitle ? (
          <StyledTeaserTitleLarge hideOverflow={hideOverflow}>
            {title}
          </StyledTeaserTitleLarge>
        ) : (
          <StyledTeaserTitle hideOverflow={hideOverflow}>
            {title}
          </StyledTeaserTitle>
        )}
        <TeaserText hideOverflow={hideOverflow} hasImage={Boolean(image)}>
          {children}
        </TeaserText>
        <Arrow />
      </Link>
    </TeaserContainer>
  );
};
