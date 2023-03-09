import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Intro } from './support';

export const ProductDesign = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <Intro
        illustration="product_design_055"
        headline={t('services.product_design.title')}
        kicker={t('services.product_design.kicker')}
      >
        <p>{t('services.product_design.text.1')}</p>
        <p>{t('services.product_design.text.2')}</p>
        <p>{t('services.product_design.text.3')}</p>
      </Intro>
    </ContentBlockContainer>
  );
};
