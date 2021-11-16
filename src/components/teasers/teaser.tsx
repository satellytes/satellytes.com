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
  cursor: pointer;
  overflow: hidden;

  img {
    transition: transform 0.2s;
  }

  &:hover {
    color: ${theme.palette.text.topline};

    p {
      color: ${theme.palette.text.topline};
    }

    img {
      transform: scale(1.05);
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

const ImageContainer = styled.div`
  overflow: hidden;
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
  dateFormatted?: string;
  icon?: JSX.Element;
  image?: IGatsbyImageData;
  linkTo: string;
}

/**
 * Teasers are used to link to another page and give the user a brief overview of the content of that page.
 * This requires a headline, the path to the page (linkTo) and a short text, which is entered as a child.
 * In addition, an illustration or an icon, a formatted date and a topline can be displayed.
 */
export const Teaser: React.FC<TeaserProps> = ({
  topline,
  title,
  dateFormatted,
  icon,
  image,
  linkTo,
  children,
}) => {
  return (
    <TeaserContainer>
      <Link to={linkTo}>
        <Illustration>{icon}</Illustration>
        {image && (
          <ImageContainer>
            <TeaserImage alt={''} image={image} />
          </ImageContainer>
        )}
        {(topline || dateFormatted) && (
          <ToplineContainer>
            {topline && <Topline>{topline}</Topline>}
            {dateFormatted && <Timestamp>{dateFormatted}</Timestamp>}
          </ToplineContainer>
        )}

        {!image && !icon ? (
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
