import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import { ContentfulBlogPostHero } from '../../../types';
import { HeroText, HeroWithText } from './hero-text';
import { HeroContainer, TextContainer } from './support';

type BlogAttribution = Pick<ContentfulBlogPostHero, 'creator' | 'source'>;

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
  naturalHeight: boolean;
  attribution?: BlogAttribution;
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

const Attribution = ({ attribution }: { attribution?: BlogAttribution }) => {
  if (!attribution || !attribution.creator || !attribution.source) {
    return null;
  }

  return (
    <AttributionContainer>
      Photo by{' '}
      <a rel="nofollow noreferrer" target="_blank" href={attribution.source}>
        {attribution.creator}
      </a>
    </AttributionContainer>
  );
};

/**
 * Display any given gatsby image as a hero image.
 */
export const BlogHero = ({
  image,
  attribution,
  title,
  children,
  naturalHeight,
}: ImageHeroProps) => {
  const gatsbyImageData = getImage(image);

  return (
    <HeroContainer naturalHeight={naturalHeight}>
      {gatsbyImageData && (
        <GatsbyImage style={coverContainerCss} alt="" image={gatsbyImageData} />
      )}

      {title && (
        <TextContainer dimmed>
          <HeroText title={title}>{children}</HeroText>
        </TextContainer>
      )}

      <Attribution attribution={attribution} />
    </HeroContainer>
  );
};
