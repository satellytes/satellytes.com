import React from 'react';
import Image from '../image/image';
import styled from 'styled-components';

interface ImageCardProps {
  imageName: string;
  alt: string;
  title: string;
  subtitle?: string;
}

const ImageCardTitle = styled.span``;

const ImageCardSubtitle = styled.span``;

const ImageCard: React.FC<ImageCardProps> = ({
  alt,
  imageName,
  title,
  subtitle,
}) => {
  return (
    <>
      <Image alt={alt} imageName={imageName} />
      <ImageCardTitle>{title}</ImageCardTitle>
      {subtitle && <ImageCardSubtitle>{subtitle}</ImageCardSubtitle>}
    </>
  );
};
export default ImageCard;
