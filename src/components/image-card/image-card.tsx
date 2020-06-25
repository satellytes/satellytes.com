import React from 'react';
import GatsbyImage, { FluidObject } from 'gatsby-image';
import styled from 'styled-components';
import {
  ImageCardTitleLarge,
  ImageCardTitle,
  ImageCardSubtitle,
  ImageCardLink,
} from '../typography/typography';
import { up } from '../breakpoint/breakpoint';

interface ImageCardProps {
  image: FluidObject;
  alt: string;
  title?: string;
  subtitle?: string;
  largeTitle?: boolean;
  links?: { title: string; url: string }[];
}

interface ImageCardLinksProps {
  links: { title: string; url: string }[];
}

const ImageCardWrapper = styled.div`
  margin-bottom: 24px;
`;

const StyledImg = styled(GatsbyImage)`
  border-radius: 4px;
`;

const StyledImageCardTitleLarge = styled(ImageCardTitleLarge)`
  margin: 16px 0 40px 0;
`;

const StyledImageCardTitle = styled(ImageCardTitle)`
  margin-top: 8px;
  margin-bottom: 0;

  ${up('md')} {
    margin-top: 16px;
  }
`;

const StyledImageCardSubtitle = styled(ImageCardSubtitle)`
  margin: 0;
`;

const LinkTitle = styled.div`
  display: inline-block;
  margin-right: 14px;
`;

const ImageCardLinks: React.FC<ImageCardLinksProps> = ({ links }) => {
  return (
    <>
      {links.map((link) => (
        <ImageCardLink to={link.url} key={link.title}>
          <LinkTitle>{link.title} &gt;</LinkTitle>
        </ImageCardLink>
      ))}
    </>
  );
};

const ImageCard: React.FC<ImageCardProps> = ({
  alt,
  image,
  title,
  largeTitle,
  subtitle,
  links,
}) => {
  return (
    <ImageCardWrapper>
      <StyledImg alt={alt} fluid={{ ...image, aspectRatio: 1 }} />
      {/* if card has a largeTitle flag, display large title. else, use regular title */}
      {largeTitle && title && (
        <StyledImageCardTitleLarge>{title}</StyledImageCardTitleLarge>
      )}
      {!largeTitle && title && (
        <StyledImageCardTitle>{title}</StyledImageCardTitle>
      )}
      {subtitle && (
        <StyledImageCardSubtitle>{subtitle}</StyledImageCardSubtitle>
      )}
      {links && <ImageCardLinks links={links} />}
    </ImageCardWrapper>
  );
};

export default ImageCard;
