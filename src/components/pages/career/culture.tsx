import React from 'react';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { Teaser } from '../../content/teaser/teaser';
import { SectionHeader } from '../../content/section-header/section-header';
import { CareerTeaserGrid } from './career-teaser-grid';
import { ContentfulSectionHeader, ContentfulTeaserItem } from '../../../types';

const CultureTeaserGrid = styled(CareerTeaserGrid)`
  margin-top: 48px;
  ${up('md')} {
    margin-top: 60px;
  }
`;

interface CultureProps {
  header: ContentfulSectionHeader;
  teaserItems: ContentfulTeaserItem[];
}

export const Culture = ({ header, teaserItems }: CultureProps) => {
  return (
    <>
      <SectionHeader
        kicker={header.kicker as string}
        headline={header.headline as string}
      >
        {header.paragraphs?.[0]?.paragraph?.paragraph as string}
      </SectionHeader>

      <CultureTeaserGrid>
        {teaserItems.map((item, index) => (
          <Teaser
            title={item.title}
            key={index}
            illustration={item.illustration}
          >
            {item.description.description}
            {''}
          </Teaser>
        ))}
      </CultureTeaserGrid>
    </>
  );
};
