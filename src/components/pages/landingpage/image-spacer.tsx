import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { getImage } from 'gatsby-plugin-image';
import { convertToBgImage } from 'gbimage-bridge';
import BackgroundImage from 'gatsby-background-image';
import React from 'react';

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
`;

export const ParallaxImageSpacer = ({ image }) => {
  const gatsbyImageData = getImage(image);
  const bgImage = convertToBgImage(gatsbyImageData);

  return (
    // eslint-disable-next-line
    // @ts-ignore get rid of "error TS2589: Type instantiation is excessively deep and possibly infinite."
    <StyledBackgroundImage fluid={bgImage?.fluid} preserveStackingContext />
  );
};
