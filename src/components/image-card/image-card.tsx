import React from 'react';
import Image from '../image/image';
import styled from 'styled-components';
import {
  ImageCardTitleLarge,
  ImageCardTitleSmall,
  ImageCardSubtitleSmall,
} from '../typography/typography';

interface ImageCardProps {
  imageName: string;
  alt: string;
  title: string;
  subtitle?: string;
  largeTitle?: boolean;
}

const ImageCardWrapper = styled.div`
  margin-bottom: 24px;
`;

const ImageCard: React.FC<ImageCardProps> = ({
  alt,
  imageName,
  title,
  subtitle,
  largeTitle,
}) => {
  return (
    <ImageCardWrapper>
      <Image alt={alt} imageName={imageName} card />
      {largeTitle ? (
        <ImageCardTitleLarge>{title}</ImageCardTitleLarge>
      ) : (
        <ImageCardTitleSmall>{title}</ImageCardTitleSmall>
      )}
      {subtitle && <ImageCardSubtitleSmall>{subtitle}</ImageCardSubtitleSmall>}
    </ImageCardWrapper>
  );
};

export default ImageCard;
