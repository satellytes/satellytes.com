import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useEffect, useRef, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import styled from 'styled-components';

interface ContainerProps {
  $width: string;
}

const FullWidthContainer = styled.div.attrs((props: ContainerProps) => props)`
  width: ${(props) => props.$width};
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const getWidthString = (toSubtract: number) => `calc(100vw - ${toSubtract}px)`;

const ConditionalAsset = ({ fullWidth, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<string>(
    getWidthString(0),
  );

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;

    if (containerRef && containerRef.current) {
      setContainerWidth(getWidthString(scrollbarWidth));
    }
  }, []);

  if (fullWidth) {
    return (
      <FullWidthContainer ref={containerRef} $width={containerWidth}>
        {children}
      </FullWidthContainer>
    );
  } else {
    return <Zoom>{children}</Zoom>;
  }
};

export const AdvancedAsset = ({ image, fullWidth }) => {
  return (
    <ConditionalAsset fullWidth={fullWidth}>
      <GatsbyImage image={image.gatsbyImageData} alt={image.description} />
    </ConditionalAsset>
  );
};
