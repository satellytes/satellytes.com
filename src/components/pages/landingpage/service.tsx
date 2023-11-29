import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { getAnchorLinkFromTitle, HomePageHeaderBlock } from './support';
import { Button } from '../../ui/buttons/button';
import { LandingPageTeaserGrid } from './landing-page-teaser-grid';
import { ContentfulSectionHeader, ContentfulTeaserItem } from '../../../types';

interface ServiceProps {
  header: ContentfulSectionHeader;
  teaser: ContentfulTeaserItem[];
}

export const Service = ({ header, teaser }: ServiceProps) => {
  const { t } = useTranslation();

  return (
    <>
      <HomePageHeaderBlock
        topline={header.kicker as string}
        headline={header.headline as string}
        large={true}
      >
        {header.paragraphs?.[0]?.paragraph?.paragraph}
      </HomePageHeaderBlock>

      <LandingPageTeaserGrid>
        {teaser.map((teaserItem, index) => (
          <Teaser
            key={index}
            title={teaserItem.title as string}
            linkTo={getAnchorLinkFromTitle(teaserItem.title as string)}
            illustration={teaserItem.illustration}
          >
            {teaserItem.description.description}
            {''}
          </Teaser>
        ))}
      </LandingPageTeaserGrid>
      <Button to={'/services'}>{t('main.services.button')}</Button>
    </>
  );
};
