import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import {
  ImageCardTitleLarge,
  ImageCardTitle,
  ImageCardSubtitle,
} from '../typography/typography';

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
  largeTitle?: string;
  subtitle?: string;
}

const ImageCardWrapper = styled.div`
  margin-bottom: 24px;
`;

const StyledImg = styled(Img)`
  border-radius: 4px;
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
      {largeTitle && <ImageCardTitleLarge>{largeTitle}</ImageCardTitleLarge>}
      {title && <ImageCardTitle>{title}</ImageCardTitle>}
      {subtitle && <ImageCardSubtitle>{subtitle}</ImageCardSubtitle>}
    </ImageCardWrapper>
  );
};

export default ImageCard;
