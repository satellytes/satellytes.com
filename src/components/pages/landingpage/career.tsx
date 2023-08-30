import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { ContentfulSectionHeader, ContentfulVacancy } from '../../../types';
import { Button } from '../../ui/buttons/button';
import { LandingPageTeaserGrid } from './landing-page-teaser-grid';
import { textEllipsis } from '../../support/text-ellipsis';

interface CareerProps {
  positions: ContentfulVacancy[];
  header: ContentfulSectionHeader;
}

export const Career = ({ positions, header }: CareerProps) => {
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
        {positions.map((item) => (
          <Teaser
            preventStretching
            key={item.id}
            title={item.name}
            linkTo={item.slug}
          >
            {textEllipsis(item.shortDescription.shortDescription, 200)}
          </Teaser>
        ))}
      </LandingPageTeaserGrid>
      <Button to={'/career'}>{t('main.career.button')}</Button>
    </>
  );
};
