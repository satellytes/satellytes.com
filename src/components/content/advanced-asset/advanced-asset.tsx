import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import Zoom from 'react-medium-image-zoom';
import styled from 'styled-components';
import customComponents from '../../legacy/markdown/custom-components';

const FullWidthContainer = styled.div`
  grid-column: 1 / 4;
  width: 100%;
`;

const ConditionalAsset = ({ fullWidth, children }) => {
  if (fullWidth) {
    return <FullWidthContainer>{children}</FullWidthContainer>;
  } else {
    return <Zoom>{children}</Zoom>;
  }
};

export const AdvancedAsset = ({ image, fullWidth, description }) => {
  return (
    <ConditionalAsset fullWidth={fullWidth}>
      {customComponents.figure({
        children: [
          <GatsbyImage
            image={image.gatsbyImageData}
            alt={image.description}
            key="gb-image"
          />,
          customComponents.figcaption({
            key: 'figcaption',
            children: description,
          }),
        ],
      })}
    </ConditionalAsset>
  );
};
