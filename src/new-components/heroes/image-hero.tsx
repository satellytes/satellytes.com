import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';
import { HeroContainer, TextContainer } from './support';
import { HeroText, HeroWithText } from './hero-text';

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
};

/**
 * Display any given gatsby image as a hero image.
 */
export const ImageHero = ({
  image,
  title,
  children,
  kicker,
}: ImageHeroProps) => {
  const gatsbyImageData = getImage(image);

  return (
    <HeroContainer>
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
    </HeroContainer>
  );
};
