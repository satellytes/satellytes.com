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
          illustration="digital_platform_056"
        >
          {t('services.platform.teaser')}
        </Teaser>
        <Teaser
          title={t('services.products_services.title')}
          linkTo="/services#products--services"
          illustration="software_057"
        >
          {t('services.products_services.teaser')}
        </Teaser>
        <Teaser
          title={t('services.consulting.title')}
          linkTo="/services#consultation"
          illustration="consulting_054"
        >
          {t('services.consulting.teaser')}
        </Teaser>
        <Teaser
          title={t('services.product_design.title')}
          linkTo="/services#product-design"
          illustration="product_design_055"
        >
          {t('services.product_design.teaser')}
        </Teaser>
      </LandingPageTeaserGrid>
      <Button to={'/services'}>{t('main.services.button')}</Button>
    </>
  );
};
