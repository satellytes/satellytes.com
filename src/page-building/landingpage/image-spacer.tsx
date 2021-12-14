import styled from 'styled-components';
import { up } from '../../components/style-utils/breakpoint';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
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
