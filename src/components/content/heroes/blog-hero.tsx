import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import { useMedia } from 'react-use';
import styled from 'styled-components';
import { ContentfulBlogPostHero } from '../../../types';
import { HeroText, HeroWithText } from './hero-text';
import { HeroContainer, TextContainer } from './support';

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
  attribution?: Omit<ContentfulBlogPostHero, 'image'>;
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

const Attribution = ({
  attribution,
}: {
  attribution: Omit<ContentfulBlogPostHero, 'image'>;
}) => (
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
  attribution,
  title,
  children,
  kicker,
}: ImageHeroProps) => {
  const gatsbyImageData = getImage(image);

  return (
    <HeroContainer naturalHeight>
      {gatsbyImageData && (
        <GatsbyImage style={coverContainerCss} alt="" image={gatsbyImageData} />
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
