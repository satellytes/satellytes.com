import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import {
  ImageCardTitleLarge,
  ImageCardTitle,
  ImageCardSubtitle,
} from '../typography/typography';
import { up } from '../breakpoint/breakpoint';

interface ImageCardProps {
  image: {
    childImageSharp: {
      fluid: {
        aspectRatio: number;
        base64: string;
        sizes: string;
        src: string;
        srcSet: string;
      };
    };
  };
  alt: string;
  title?: string;
  subtitle?: string;
  largeTitle?: boolean;
}

const ImageCardWrapper = styled.div`
  margin-bottom: 24px;
`;

const StyledImg = styled(Img)`
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

const ImageCard: React.FC<ImageCardProps> = ({
  alt,
  image,
  title,
  largeTitle,
  subtitle,
}) => {
  return (
    <ImageCardWrapper>
      <StyledImg
        alt={alt}
        sizes={{
          ...image.childImageSharp.fluid,
          aspectRatio: 1 / 1,
        }}
      />
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
    </ImageCardWrapper>
  );
};

export default ImageCard;
