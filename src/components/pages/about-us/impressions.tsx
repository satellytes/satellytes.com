import React from 'react';
import {
  AboutUsImpressionTileSize,
  ContentfulAboutUsImpression,
} from '../../../types';
import { SectionHeader } from '../../content/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { up } from '../../support/breakpoint';

interface ImpressionsProps {
  impressions: ContentfulAboutUsImpression[];
}

const GalleryGrid = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fill, 250px);
  grid-auto-flow: row;

  margin-top: 48px;

  ${up('sm')} {
    gap: 24px;
    margin-top: 60px;
  }
`;

const getSpan = (tileSize: AboutUsImpressionTileSize) => {
  switch (tileSize) {
    case 'landscape-big':
      return 'span 2 / span 2';
    case 'landscape-small':
      return 'span 1 / span 1';
    case 'portrait':
      return 'span 2 / span 1';
  }
};

const GalleryItem = styled.div<{ tileSize: AboutUsImpressionTileSize }>`
  grid-area: ${({ tileSize }) => getSpan(tileSize)};
`;

const GalleryImage = styled(GatsbyImage)`
  min-width: 100%;
  min-height: 100%;
`;

export const Impressions = ({ impressions }: ImpressionsProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SectionHeader
        headline={t<string>('about-us.impressions.heading')}
        kicker={t<string>('about-us.impressions.title')}
      >
        {t('about-us.impressions.text')}
      </SectionHeader>

      <GalleryGrid>
        {impressions.map((item) => {
          const imageData = getImage(item.image);
          return (
            <GalleryItem tileSize={item.tileSize} key={item.id}>
              {imageData && <GalleryImage alt="" image={imageData} />}
            </GalleryItem>
          );
        })}
      </GalleryGrid>
    </>
  );
};
