import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

const ImageContainer = styled.div`
  grid-column: 1 / 4;

  display: grid;
  height: 210px;
  margin-top: 80px;

  ${up('md')} {
    height: 360px;
    margin-top: 180px;
  }
`;

/**
 * Display any given gatsby image as a spacer that covers the entire width
 */
export const ImageSpacer = ({ image }) => {
  const gatsbyImageData = getImage(image);

  return (
    <ImageContainer>
      {gatsbyImageData && <GatsbyImage alt="" image={gatsbyImageData} />}
    </ImageContainer>
  );
};
