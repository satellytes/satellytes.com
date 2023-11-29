import React from 'react';
import {
  AboutUsImpressionTileSize,
  ContentfulAboutUsImpression,
  ContentfulSectionHeader,
} from '../../../types';
import { SectionHeader } from '../../content/section-header/section-header';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { up } from '../../support/breakpoint';
import { MobileOnlyText } from '../../content/heroes/support';
import { Text } from '../../legacy/typography';

interface ImpressionsProps {
  impressions: ContentfulAboutUsImpression[];
  description: string;
  sectionHeader: ContentfulSectionHeader;
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

const GalleryItem = styled.div<{ $tileSize: AboutUsImpressionTileSize }>`
  grid-area: ${({ $tileSize }) => getSpan($tileSize)};
`;

const GalleryImage = styled(GatsbyImage)`
  min-width: 100%;
  min-height: 100%;
`;

export const Impressions = ({
  impressions,
  description,
  sectionHeader,
}: ImpressionsProps) => {
  return (
    <>
      <SectionHeader
        headline={sectionHeader.headline as string}
        kicker={sectionHeader.kicker as string}
      >
        <MobileOnlyText>{description}</MobileOnlyText>
        <Text>
          {sectionHeader.paragraphs?.[0]?.paragraph?.paragraph as string}
        </Text>
      </SectionHeader>

      <GalleryGrid>
        {impressions.map((item) => {
          const imageData = getImage(item.image);
          return (
            <GalleryItem $tileSize={item.tileSize} key={item.id}>
              {imageData && <GalleryImage alt="" image={imageData} />}
            </GalleryItem>
          );
        })}
      </GalleryGrid>
    </>
  );
};
