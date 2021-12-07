import React, { useRef, useState } from 'react';
import {
  assertCloudinaryUrl,
  transformCloudinaryUrl,
} from '../util/cloudinary-util';
import { useDebounce, useWindowSize } from 'react-use';
import styled from 'styled-components';
import { up } from '../style-utils/breakpoint';

const IMAGE_MAX_WIDTH = 1280;

const StyledImage = styled.img`
  width: 100%;
`;

interface CloudinaryImageProps {
  src: string;
  alt: string;
}

export const ResponsiveCloudinaryImage: React.FC<CloudinaryImageProps> = (
  props,
) => {
  assertCloudinaryUrl(props.src);

  const imageRef = useRef<HTMLImageElement>(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageSrc, setImageSrc] = useState('');
  const { width: windowWidth } = useWindowSize();

  useDebounce(
    () => {
      const width = imageRef.current?.width || 0;
      const newImageWidth = width <= IMAGE_MAX_WIDTH ? width : IMAGE_MAX_WIDTH;

      // we only change the width if the picture gets better/larger
      if (imageWidth === 0 || newImageWidth > imageWidth) {
        setImageWidth(newImageWidth);
        setImageSrc(transformCloudinaryUrl(props.src, newImageWidth));
      }
    },
    250,
    [windowWidth],
  );

  return <StyledImage src={imageSrc} alt={props.alt} ref={imageRef} />;
};

const BackgroundCloudinaryImage = styled.div<{ src: string }>`
  height: 344px;
  object-fit: scale-down;
  background: url(${(props) => props.src}) no-repeat center;
  background-size: cover;

  ${up('md')} {
    height: 560px;
  }
`;

export const ResponsiveCloudinaryBackgroundImage: React.FC<{ src: string }> = (
  props,
) => {
  assertCloudinaryUrl(props.src);

  const imageRef = useRef<HTMLDivElement>(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageSrc, setImageSrc] = useState('');
  const { width: windowWidth } = useWindowSize();

  useDebounce(
    () => {
      const width = imageRef.current?.clientWidth || 0;
      const newImageWidth = width <= IMAGE_MAX_WIDTH ? width : IMAGE_MAX_WIDTH;

      // we only change the width if the picture gets better/larger
      if (imageWidth === 0 || newImageWidth > imageWidth) {
        setImageWidth(newImageWidth);
        setImageSrc(transformCloudinaryUrl(props.src, newImageWidth));
      }
    },
    250,
    [windowWidth],
  );

  return <BackgroundCloudinaryImage src={imageSrc} ref={imageRef} />;
};
