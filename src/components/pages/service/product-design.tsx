import React from 'react';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Intro } from './support';
import { useTranslationParagraphs } from '../../i18n-helpers';

export const ProductDesign = () => {
  const { t, tWithParagraphs } = useTranslationParagraphs();

  return (
    <ContentBlockContainer>
      <Intro
        illustration="product_design_055"
        headline={t('services.product_design.title')}
        kicker={t('services.product_design.kicker')}
      >
        {tWithParagraphs('services.product_design.text')}
      </Intro>
    </ContentBlockContainer>
  );
};
