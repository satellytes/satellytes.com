import React from 'react';
import styled from 'styled-components';
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

const TeaserContainer = styled.div`
  width: 320px;
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

const TeaserText = styled(Text)<{ hasImage: boolean }>`
  margin-bottom: 22px;
  margin-top: ${(props) => (props.hasImage ? '8px' : '16px')};
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
          <TeaserTitleLarge>{title}</TeaserTitleLarge>
        ) : (
          <TeaserTitle>{title}</TeaserTitle>
        )}
        <TeaserText hasImage={Boolean(image)}>{children}</TeaserText>
        <Arrow />
      </Link>
    </TeaserContainer>
  );
};
