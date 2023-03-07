import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Teaser } from '../../content/teaser/teaser';
import React from 'react';
import { HomePageHeaderBlock } from './support';
import { Button } from '../../ui/buttons/button';
import { LandingPageTeaserGrid } from './landing-page-teaser-grid';

export const Service = () => {
  const { t } = useTranslation();

  return (
    <>
      <HomePageHeaderBlock
        topline={t('main.services.kicker')}
        headline={t('main.services.title')}
        large={true}
      >
        {t('main.services.text')}
      </HomePageHeaderBlock>

      <LandingPageTeaserGrid>
        <Teaser
          title={t('services.platform.title')}
          linkTo="/services#digital-platforms"
          illustration="monitor_024"
        >
          {t('services.platform.teaser')}
        </Teaser>
        <Teaser
          title={t('services.products_services.title')}
          linkTo="/services#products--services"
          illustration="book_038"
        >
          {t('services.products_services.teaser')}
        </Teaser>
        <Teaser
          title={t('services.consulting.title')}
          linkTo="/services#consultation"
          illustration="scientist_042"
        >
          {t('services.consulting.teaser')}
        </Teaser>
        <Teaser
          title={t('services.design.title')}
          linkTo="/services#design"
          illustration="scientist_042"
        >
          {t('services.design.teaser')}
        </Teaser>
      </LandingPageTeaserGrid>
      <Button to={'/services'}>{t('main.services.button')}</Button>
    </>
  );
};
