import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  TeaserTitle,
  Timestamp,
  Topline,
} from '../../components/typography/typography';
import { theme } from '../../components/layout/theme';
import { Link } from '../../components/links/links';
import { IllustrationType } from '../../components/illustration/illustration-set';
import { Illustration } from '../../components/illustration/illustration';
import { Icon } from '../icon/icon';
import { TextStyles } from '../../components/typography/typography-v2';

const TeaserContainer = styled.div<{ hover: boolean }>`
  cursor: pointer;
  overflow: hidden;

  color: ${(props) => props.hover && theme.palette.text.topline};
`;

const StyledIllustration = styled(Illustration)<{ hover: boolean }>`
  ${(props) =>
    props.hover &&
    css`
      svg path {
        fill: ${theme.palette.text.topline};
      }
    `}
`;

const ToplineContainer = styled.div`
  display: flex;
  margin-top: 16px;
  width: 100%;
  justify-content: space-between;
`;

const TeaserText = styled.div`
  ${TextStyles.textR};
  margin: 16px 0 22px;
`;

const StyledTeaserTitle = styled(TeaserTitle)<{
  hasTopline: boolean;
  large?: boolean;
}>`
  margin-top: ${(props) => (props.hasTopline ? '8px' : '24px')};

  ${(props) =>
    props.large &&
    css`
      margin-top: 20px;
      font-size: 28px;
    `}
`;

const ImageContainer = styled.div<{ hover: boolean }>`
  overflow: hidden;
  transition: transform 0.2s;
  transform: ${(props) => props.hover && 'scale(1.05)'};
`;

export interface TeaserProps {
  title: string;
  topline?: string;
  dateFormatted?: string | null;
  teaserImage?: JSX.Element;
  illustration?: IllustrationType;
  linkTo?: string;
  className?: string;
}

/**
 * Teasers are used to link to another page and give the user a brief overview of the content of that page.
 * This requires a headline, the path to the page (linkTo) and a short text, which is entered as a child.
 * In addition, an illustration or an image, a formatted date and a topline can be displayed.
 */

const ConditionalLink = ({ to, children }) => {
  if (to) {
    return <Link to={to}>{children}</Link>;
  }

  return children;
};

export const Teaser: React.FC<TeaserProps> = ({
  topline,
  title,
  dateFormatted,
  teaserImage,
  linkTo,
  illustration,
  className,
  children,
}) => {
  const [hoverActive, setIsHoverActive] = useState<boolean>(false);
  const hasToplineContainer = Boolean(topline || dateFormatted);

  return (
    <TeaserContainer
      className={className}
      hover={hoverActive}
      onMouseEnter={() => {
        Boolean(linkTo) && setIsHoverActive(true);
      }}
      onMouseLeave={() => {
        setIsHoverActive(false);
      }}
    >
      <ConditionalLink to={linkTo}>
        {teaserImage && (
          <ImageContainer hover={hoverActive}>{teaserImage}</ImageContainer>
        )}
        {illustration && (
          <StyledIllustration show={illustration} hover={hoverActive} />
        )}
        {hasToplineContainer && (
          <ToplineContainer>
            {topline && <Topline>{topline}</Topline>}
            {dateFormatted && <Timestamp>{dateFormatted}</Timestamp>}
          </ToplineContainer>
        )}
        <StyledTeaserTitle hasTopline={hasToplineContainer}>
          {title}
        </StyledTeaserTitle>
        <TeaserText>{children}</TeaserText>
        {linkTo && <Icon show={'arrow_right'} />}
      </ConditionalLink>
    </TeaserContainer>
  );
};
