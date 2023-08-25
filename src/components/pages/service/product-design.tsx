import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Intro } from './support';
import { ContentfulSectionHeader } from '../../../types';

interface ProductDesignProps {
  header: ContentfulSectionHeader;
}

export const ProductDesign = ({ header }: ProductDesignProps) => {
  return (
    <ContentBlockContainer>
      <Intro
        illustration={header.illustration}
        headline={header.headline}
        kicker={header.kicker}
      >
        <p style={{ whiteSpace: 'pre-line' }}>
          {header.paragraphs?.[0]?.paragraph?.paragraph as string}
        </p>
      </Intro>
    </ContentBlockContainer>
  );
};
