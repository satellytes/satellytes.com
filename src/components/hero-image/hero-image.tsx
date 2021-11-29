import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

const ImageWide = styled(GatsbyImage)`
  display: block;
  @media (max-aspect-ratio: 3/4) {
    display: none;
  }
`;

const ImageTall = styled(GatsbyImage)`
  display: none;
  @media (max-aspect-ratio: 3/4) {
    display: block;
  }
`;

const Container = styled.div`
  position: relative;
`;

const AttributionContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
  display: block;
  padding: 2px;
  font-size: 0.8em;
`;

const Attribution = ({ attribution }) => (
  <AttributionContainer>
    Photo by{' '}
    <a rel="nofollow noreferrer" target="_blank" href={attribution.source}>
      {attribution.creator}
    </a>
  </AttributionContainer>
);

export const HeroImage = ({ wideImage, squareImage, attribution }) => {
  /**
   * We want to show different hero image versions for tall and wide screens. A screen is considered tall
   * once the height is larger then the width, the aspect ratio will then have a value between `[0..1]`.
   * We use two different images which hide & show themselves around the aspect ratio of 0.75 (see their CSS definitions).
   * HeroImageDefault
   * If the media query is not supported the squared version is never shown (kind of graceful degradation for this variation)
   */
  return (
    <Container>
      <ImageWide alt="" image={wideImage} />
      <ImageTall alt="" image={squareImage} />
      {attribution ? <Attribution attribution={attribution} /> : null}
    </Container>
  );
};
