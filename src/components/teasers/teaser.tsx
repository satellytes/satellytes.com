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

    svg path {
      fill: ${theme.palette.text.topline};
    }
  }
`;

const ToplineContainer = styled.div`
  display: flex;
  margin-top: 16px;
  width: 100%;
  justify-content: space-between;
`;

const TeaserText = styled(Text)`
  margin: 16px 0 22px;
`;

const StyledTeaserTitle = styled(TeaserTitle)<{ hasTopline: boolean }>`
  margin-top: ${(props) => (props.hasTopline ? '8px' : '24px')};
`;

const CoverContainer = styled.div`
  overflow: hidden;
`;

interface TeaserProps {
  title: string;
  topline?: string;
  dateFormatted?: string;
  cover?: JSX.Element;
  linkTo: string;
}

/**
 * Teasers are used to link to another page and give the user a brief overview of the content of that page.
 * This requires a headline, the path to the page (linkTo) and a short text, which is entered as a child.
 * In addition, an illustration or an image, a formatted date and a topline can be displayed.
 */
export const Teaser: React.FC<TeaserProps> = ({
  topline,
  title,
  dateFormatted,
  cover,
  linkTo,
  children,
}) => {
  const hasToplineContainer = Boolean(topline || dateFormatted);

  return (
    <TeaserContainer>
      <Link to={linkTo}>
        {cover && <CoverContainer>{cover}</CoverContainer>}
        {hasToplineContainer && (
          <ToplineContainer>
            {topline && <Topline>{topline}</Topline>}
            {dateFormatted && <Timestamp>{dateFormatted}</Timestamp>}
          </ToplineContainer>
        )}
        {cover ? (
          <StyledTeaserTitle hasTopline={hasToplineContainer}>
            {title}
          </StyledTeaserTitle>
        ) : (
          <TeaserTitleLarge>{title}</TeaserTitleLarge>
        )}
        <TeaserText>{children}</TeaserText>
        <Arrow />
      </Link>
    </TeaserContainer>
  );
};
