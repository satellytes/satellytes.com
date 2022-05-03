import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { convertToBgImage } from 'gbimage-bridge';
import BackgroundImage from 'gatsby-background-image';
import React from 'react';

const coverContainerCss = {
  gridArea: '1/1',
};

const ImageContainer = styled.div`
  /**
    We enforce a higher specificity with \`&&\` (repeat the classname two times) to overrule the layout main rule of assigning any content to a specific column \`> *{  grid-column: content; }\` in the grid
    which we want to escape to spread over the full width.

    Do not remove easily. The actual order of CSS rules is not stable
    and the two rules (from the layout and this) will have the same specificity.
   */
  && {
    grid-column: -1/1;
  }

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
      {gatsbyImageData && (
        <GatsbyImage style={coverContainerCss} alt="" image={gatsbyImageData} />
      )}
    </ImageContainer>
  );
};

const StyledBackgroundImage = styled(BackgroundImage)`
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /**
    We enforce a higher specificity with \`&&\` (repeat the classname two times) to overrule the layout main rule of assigning any content to a specific column \`> *{  grid-column: content; }\` in the grid
    which we want to escape to spread over the full width.

    Do not remove easily. The actual order of CSS rules is not stable
    and the two rules (from the layout and this) will have the same specificity.
   */
  && {
    grid-column: -1/1;
  }

  display: grid;

  height: 210px;
  margin-top: 80px;

  ${up('md')} {
    height: 360px;
    margin-top: 180px;
  }

  picture {
    position: relative;
  }
`;

export const ParallaxImageSpacer = ({ image }) => {
  const gatsbyImageData = getImage(image);

  // Use like this:
  const bgImage = convertToBgImage(gatsbyImageData);

  return (
    <StyledBackgroundImage
      Tag="section"
      // Spread bgImage into BackgroundImage:
      {...bgImage}
      preserveStackingContext
    >
      {gatsbyImageData && (
        <GatsbyImage image={gatsbyImageData} alt={'testimage'} />
      )}
    </StyledBackgroundImage>
  );
};
