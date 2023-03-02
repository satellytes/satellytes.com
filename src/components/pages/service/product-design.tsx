import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Intro } from './support';

export const ProductDesign = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <Intro
        illustration="eclipse_039"
        headline={t('services.product_design.title')}
      >
        <p>{t('services.product_design.text')}</p>
      </Intro>
    </ContentBlockContainer>
  );
};
