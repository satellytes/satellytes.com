import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import { HeroContainer, TextContainer } from './support';
import { HeroText, HeroWithText } from './hero-text';
import styled from 'styled-components';
import { useMedia } from 'react-use';

const coverContainerCss = {
  gridArea: '1/1',
  /**
   * make sure the image, which is positioned absolute by gatsby,
   * is behind any content on the current stacking context.
   */
  zIndex: -1,
};

type ImageHeroProps = Partial<HeroWithText> & {
  image: IGatsbyImageData;
  imageSquare: IGatsbyImageData;
  attribution?: any;
};

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

/**
 * Display any given gatsby image as a hero image.
 */
export const BlogHero = ({
  image,
  imageSquare,
  attribution,
  title,
  children,
  kicker,
}: ImageHeroProps) => {
  const gatsbyImageData = getImage(image);
  const gatsbyImageDataSquare = getImage(imageSquare);

  const isSquare = useMedia('(max-aspect-ratio: 3/4)');

  return (
    <HeroContainer>
      {isSquare && gatsbyImageDataSquare && (
        <GatsbyImage
          style={coverContainerCss}
          alt=""
          image={gatsbyImageDataSquare}
          objectPosition="top center"
        />
      )}

      {!isSquare && gatsbyImageData && (
        <GatsbyImage
          style={coverContainerCss}
          alt=""
          image={gatsbyImageData}
          objectPosition="top center"
        />
      )}

      {title && (
        <TextContainer dimmed>
          <HeroText title={title} kicker={kicker}>
            {children}
          </HeroText>
        </TextContainer>
      )}

      {attribution && <Attribution attribution={attribution} />}
    </HeroContainer>
  );
};
