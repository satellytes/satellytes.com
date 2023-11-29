import React from 'react';
import styled from 'styled-components';
import { Teaser } from '../../content/teaser/teaser';
import { up } from '../../support/breakpoint';
import { SectionHeader } from '../../content/section-header/section-header';
import { CareerTeaserGrid } from './career-teaser-grid';
import { ContentfulSectionHeader, ContentfulTeaserItem } from '../../../types';

const PerksTeaserGrid = styled(CareerTeaserGrid)`
  margin-top: 48px;

  ${up('md')} {
    margin-top: 60px;
  }
`;

interface PerksProps {
  header: ContentfulSectionHeader;
  teaserItems: ContentfulTeaserItem[];
}

export const Perks = ({ header, teaserItems }: PerksProps) => {
  return (
    <>
      <SectionHeader
        kicker={header.kicker as string}
        headline={header.headline as string}
      >
        {header.paragraphs?.[0]?.paragraph?.paragraph as string}
      </SectionHeader>

      <PerksTeaserGrid>
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
      </PerksTeaserGrid>
    </>
  );
};
