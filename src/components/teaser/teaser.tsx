import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../layout/theme';
import { Link } from '../../legacy-components/links/links';
import { IllustrationType } from '../illustration/illustration-set';
import { Illustration, IllustrationSize } from '../illustration/illustration';
import { Icon } from '../icon/icon';
import { TextStyles } from '../typography';

const TeaserContainer = styled.div<{ hover: boolean }>`
  overflow: hidden;

  ${(props) =>
    props.hover &&
    css`
      color: ${theme.palette.text.topline};
      cursor: pointer;
    `};
`;

const StyledIllustration = styled(Illustration)<{ hover: boolean }>`
  margin-bottom: 24px;
  ${(props) =>
    props.hover &&
    css`
      svg path {
        fill: ${theme.palette.text.topline};
      }
    `}
`;

const ImageContainer = styled.div<{ hover: boolean }>`
  overflow: hidden;
  margin-bottom: 16px;

  transition: transform 0.2s;
  ${(props) => props.hover && 'transform: scale(1.05)'};
`;

const ToplineContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  width: 100%;
  justify-content: space-between;
`;

const Topline = styled.p`
  ${TextStyles.toplineS};
  color: ${theme.palette.text.topline};
  margin: 0;
`;

const Timestamp = styled.p<{ hover: boolean }>`
  ${TextStyles.timestamp};
  color: ${(props) =>
    props.hover ? theme.palette.text.topline : theme.palette.text.timestamp};
  margin: 0;
`;

const TeaserText = styled.div`
  ${TextStyles.textR};
  margin: 0;
`;

const StyledTeaserTitle = styled.p<{
  large: boolean;
  hasTopline: boolean;
}>`
  ${TextStyles.headlineS}
  ${(props) => props.large && TextStyles.headlineM};

  margin-top: 0;
  margin-bottom: ${(props) => (props.hasTopline ? '8px' : '16px')};
`;

const StyledIcon = styled(Icon)`
  margin-top: 14px;
`;

export interface TeaserProps {
  /**
   * The main title of the teaser
   */
  title: string;
  /**
   * A topline/kicker which can be added
   */
  topline?: string;
  /**
   * An already formatted date string which is mainly used for the blog post overview
   */
  dateFormatted?: string | null;
  /**
   * The image above the title. You can't pass in an image and illustration. If you pass in an image and illustration the illustration will be taken.
   */
  image?: JSX.Element;
  /**
   * An illustration for the teaser
   */
  illustration?: IllustrationType;
  /**
   * Adds a link to another page and makes the whole teaser clickable
   */
  linkTo?: string;
  className?: string;
  /**
   * The main text of the teaser is entered as child
   * */
  children: React.ReactNode | React.ReactNode[];
}

const ConditionalLink = ({ to, children, onHover }) => {
  if (to) {
    return (
      <Link
        to={to}
        onMouseOver={() => {
          onHover(true);
        }}
        onMouseLeave={() => onHover(false)}
      >
        {children}
      </Link>
    );
  }

  return children;
};

export const Teaser = ({
  topline,
  title,
  dateFormatted,
  image,
  linkTo,
  illustration,
  className,
  children,
}: TeaserProps): JSX.Element => {
  const [hoverActive, setIsHoverActive] = useState<boolean>(false);
  const hasToplineContainer = Boolean(topline || dateFormatted);

  return (
    <TeaserContainer className={className} hover={hoverActive}>
      <ConditionalLink
        onHover={(hasHover) => setIsHoverActive(hasHover)}
        to={linkTo}
      >
        {!illustration && image && (
          <ImageContainer hover={hoverActive}>{image}</ImageContainer>
        )}
        {illustration && (
          <StyledIllustration
            show={illustration}
            size={IllustrationSize.MEDIUM}
            hover={hoverActive}
          />
        )}
        {hasToplineContainer && (
          <ToplineContainer>
            {topline && <Topline>{topline}</Topline>}
            {dateFormatted && (
              <Timestamp hover={hoverActive}>{dateFormatted}</Timestamp>
            )}
          </ToplineContainer>
        )}
        <StyledTeaserTitle
          large={!(image || illustration)}
          hasTopline={hasToplineContainer}
        >
          {title}
        </StyledTeaserTitle>
        <TeaserText>{children}</TeaserText>
        {linkTo && <StyledIcon show={'arrow_right'} />}
      </ConditionalLink>
    </TeaserContainer>
  );
};
