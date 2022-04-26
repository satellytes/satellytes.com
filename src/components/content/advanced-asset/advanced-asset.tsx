import React from 'react';
import styled from 'styled-components';
import Zoom from 'react-medium-image-zoom';
import { GatsbyImage } from 'gatsby-plugin-image';

const FullWidthContainer = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

const ConditionalAsset = ({ fullWidth, children }) => {
  if (fullWidth) {
    return <FullWidthContainer>{children}</FullWidthContainer>;
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
